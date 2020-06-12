import { Component, OnInit, NgZone } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { TokenService } from './auth/token/token.service';
import { oauth2Config } from './auth/token/credentials-config';
import { LOGGED_IN } from './auth/token/storage-constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  loggedIn: boolean;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private token: TokenService,
    private ngZone: NgZone,
    private router: Router,
    public nav: NavController,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.loggedIn = localStorage.getItem(LOGGED_IN) ? true : false;
    this.token.configure(oauth2Config);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.catchUrlScheme();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logIn() {
    this.token.logIn();
  }

  logOut() {
    this.token.logOut();
  }

  catchUrlScheme() {
    // https://github.com/EddyVerbruggen/Custom-URL-scheme/issues/227
    (window as any).handleOpenURL = (url: string) => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.handleOpenUrl(url);
        });
      }, 0);
    };
  }

  handleOpenUrl(url: string) {
    this.token.processCode(url);
  }

}
