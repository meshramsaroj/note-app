import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  HandleError,
  HttpErrorHandler,
} from './common/services/http-error-handler/http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import {
  CLIENT_ID,
  REDIRECT_URI,
  SILENT_REFRESH_REDIRECT_URI,
  LOGIN_URL,
  ISSUER_URL,
  APP_URL,
  COMMUNICATION_SERVER,
  COMMUNICATION_SERVER_URL,
} from './constants/storage';
import { AUTH_INFO_ENDPOINT } from './constants/common';

@Injectable()
export class AppService {
  messageUrl = '/api/info'; // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AppService');
  }

  /** GET message from the server */
  getMessage(): Observable<any> {
    return this.http.get<any>(this.messageUrl).pipe(
      switchMap(appInfo => {
        return this.http
          .get<any>(appInfo.authServerURL + AUTH_INFO_ENDPOINT)
          .pipe(
            map(authInfo => {
              appInfo.services = authInfo.services;
              appInfo.communication = authInfo.communication;
              return appInfo;
            }),
          );
      }),
      catchError(
        this.handleError(this.messageUrl, { message: 'disconnected' }),
      ),
    );
  }

  setInfoLocalStorage(response) {
    localStorage.setItem(CLIENT_ID, response.clientId);
    localStorage.setItem(REDIRECT_URI, response.callbackURLs[0]);
    localStorage.setItem(SILENT_REFRESH_REDIRECT_URI, response.callbackURLs[1]);
    localStorage.setItem(LOGIN_URL, response.authorizationURL);
    localStorage.setItem(ISSUER_URL, response.authServerURL);
    localStorage.setItem(APP_URL, response.appURL);

    this.http.get<any>(response.authServerURL + AUTH_INFO_ENDPOINT).subscribe({
      next: data => {
        data.services.forEach(element => {
          if (element.type === COMMUNICATION_SERVER) {
            localStorage.setItem(COMMUNICATION_SERVER_URL, element.url);
          }
        });
      },
      error: err => {},
    });
  }

  home() {
    return this.http.get('/api/note-helper/v1/read');
  }
}
