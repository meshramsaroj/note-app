import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { OAuth2Config } from './credentials-config';
import {
  STATE,
  CODE_VERIFIER,
  REFRESH_TOKEN,
  EXPIRES_IN,
  ACCESS_TOKEN,
  ID_TOKEN,
  LOGGED_IN,
  ONE_HOUR_IN_SECONDS_NUMBER,
  SPLASHSCREEN_KEY,
  TEN_MINUTES_IN_SECONDS_NUMBER,
} from './storage-constants';
import { parse } from 'url';
import * as sjcl from 'sjcl';
import { stringify } from 'querystring';
import { Platform } from '@ionic/angular';
import { switchMap, retry, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  config: OAuth2Config;
  private headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  constructor(
    private iab: InAppBrowser,
    private http: HttpClient,
    private platform: Platform,
    private browserTab: BrowserTab,
  ) { }

  configure(config: OAuth2Config) {
    this.config = config;
  }

  logIn() {
    const url = this.generateAuthUrl();
    if (this.platform.is('cordova')) {
      this.browserTab.isAvailable().then(isAvailable => {
        if (isAvailable) {
          this.browserTab.openUrl(url);
        } else {
          // open URL with InAppBrowser instead
          this.iab.create(url, '_system', { location: 'yes' });
        }
      });
    } else {
      // open URL with InAppBrowser instead
      this.iab.create(url, '_system', { location: 'yes' });
    }
  }

  logOut() {
    localStorage.removeItem(LOGGED_IN);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    this.deleteRefreshToken(REFRESH_TOKEN);
    this.refreshCordova();
  }

  processCode(url: string) {
    const savedState = localStorage.getItem(STATE);
    localStorage.removeItem(STATE);

    const urlParts = parse(url, true);
    const query = urlParts.query;
    const code = query.code as string;
    const state = query.state as string;
    const error = query.error;

    if (savedState !== state) {
      return;
    }

    if (error !== undefined) {
      return;
    } else if (code) {
      const codeVerifier = localStorage.getItem(CODE_VERIFIER);
      localStorage.removeItem(CODE_VERIFIER);

      const req: any = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.config.callbackUrl,
        client_id: this.config.clientId,
        scope: this.config.scope,
        code_verifier: codeVerifier,
      };

      this.http
        .post<any>(this.config.tokenUrl, stringify(req), {
          headers: this.headers,
        })
        .subscribe({
          next: response => {
            const expiresIn = response.expires_in || ONE_HOUR_IN_SECONDS_NUMBER;
            const expirationTime = new Date();
            expirationTime.setSeconds(
              expirationTime.getSeconds() + Number(expiresIn),
            );

            localStorage.setItem(ACCESS_TOKEN, response.access_token);

            this.saveRefreshToken(response.refresh_token);

            localStorage.setItem(EXPIRES_IN, expirationTime.toISOString());
            localStorage.setItem(ID_TOKEN, response.id_token);
            localStorage.setItem(LOGGED_IN, 'true');

            this.refreshCordova();
          },
          error: err => { },
        });
    }
  }

  revokeToken(refresh: boolean = false) {
    this.http
      .post(this.config.logoutUrl, null, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
        },
      })
      .subscribe({
        next: success => {
          if (refresh) {
            this.refreshCordova();
          }
        },
        error: error => { },
      });
  }

  getToken() {
    const expiration = localStorage.getItem(EXPIRES_IN);
    if (expiration) {
      const now = new Date();
      const expirationTime = new Date(expiration);

      // expire 10 min early
      expirationTime.setSeconds(
        expirationTime.getSeconds() - TEN_MINUTES_IN_SECONDS_NUMBER,
      );
      if (now < expirationTime) {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        return of(accessToken);
      }
      return this.refreshToken();
    }
    return of();
  }

  refreshToken() {
    return from(this.getRefreshToken()).pipe(
      switchMap(refreshToken => {
        const requestBody = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          redirect_uri: this.config.callbackUrl,
          client_id: this.config.clientId,
          scope: this.config.scope,
        };
        return this.http
          .post<any>(this.config.tokenUrl, stringify(requestBody), {
            headers: this.headers,
          })
          .pipe(
            switchMap(bearerToken => {
              this.revokeToken();
              const expirationTime = new Date();
              const expiresIn =
                bearerToken.expires_in || ONE_HOUR_IN_SECONDS_NUMBER;
              expirationTime.setSeconds(
                expirationTime.getSeconds() + Number(expiresIn),
              );
              localStorage.setItem(EXPIRES_IN, expirationTime.toISOString());
              localStorage.setItem(ID_TOKEN, bearerToken.id_token);
              localStorage.setItem(ACCESS_TOKEN, bearerToken.access_token);

              this.saveRefreshToken(bearerToken.refresh_token);
              return of(bearerToken.access_token);
            }),
            retry(3),
            catchError(error => {
              this.revokeToken();
              this.logOut();
              return of();
            }),
          );
      }),
    );
  }

  generateAuthUrl() {
    const state = this.generateRandomString();
    localStorage.setItem(STATE, state);

    const codeVerifier = this.generateRandomString();
    localStorage.setItem(CODE_VERIFIER, codeVerifier);

    const challenge = sjcl.codec.base64
      .fromBits(sjcl.hash.sha256.hash(codeVerifier))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    let url = this.config.authorizationUrl;
    url += '?scope=' + this.config.scope;
    url += '&response_type=code';
    url += '&client_id=' + this.config.clientId;
    url += '&redirect_uri=' + encodeURIComponent(this.config.callbackUrl);
    url += '&state=' + state;
    url += '&code_challenge_method=S256&prompt=select_account';
    url += '&code_challenge=' + challenge;

    return url;
  }

  generateRandomString(stateLength: number = 32) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < stateLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  refreshCordova() {
    if (this.platform.is('cordova')) {
      const initialUrl = window.location.href;
      navigator[SPLASHSCREEN_KEY].show();
      window.location.href = initialUrl;
    }
  }

  saveRefreshToken(refreshToken: string) {
    if (this.platform.is('pwa')) {
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }

    if (this.platform.is('android') || this.platform.is('ios')) {
      const sharedPreferences = (window as any).plugins.SharedPreferences.getInstance(
        'settings',
      );
      sharedPreferences.put(
        REFRESH_TOKEN,
        refreshToken,
        success => { },
        error => { },
      );
    }
  }

  deleteRefreshToken(refreshToken: string) {
    if (this.platform.is('pwa')) {
      localStorage.removeItem(REFRESH_TOKEN);
    }

    if (this.platform.is('android') || this.platform.is('ios')) {
      const sharedPreferences = (window as any).plugins.SharedPreferences.getInstance(
        'settings',
      );
      sharedPreferences.del(
        REFRESH_TOKEN,
        success => { },
        error => { },
      );
    }
  }

  getRefreshToken(): Promise<string> {
    if (this.platform.is('pwa')) {
      return Promise.resolve(localStorage.getItem(REFRESH_TOKEN));
    }

    if (this.platform.is('android') || this.platform.is('ios')) {
      const sharedPreferences = (window as any).plugins.SharedPreferences.getInstance(
        'settings',
      );
      return new Promise((resolve, reject) => {
        sharedPreferences.get(
          REFRESH_TOKEN,
          null,
          refreshToken => resolve(refreshToken),
          error => reject(error),
        );
      });
    }
  }
}
