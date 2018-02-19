import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { EventsPage } from '../pages/events/events';

const config = {
  apiKey: "AIzaSyCNATg5Q8TZqnxW3PhaqdMNfan9zobQMTs",
  authDomain: "coms-309.firebaseapp.com",
  databaseURL: "https://coms-309.firebaseio.com",
  projectId: "coms-309",
  storageBucket: "coms-309.appspot.com",
  messagingSenderId: "769505137443"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged( user => {
        if (!user) {
          this.rootPage = 'LoginPage';
          unsubscribe();
        }  else { 
          this.rootPage = 'LoginPage';
          console.log('ERROR');
           unsubscribe();
         } 
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);

  }
}

