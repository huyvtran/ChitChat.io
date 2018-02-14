import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { DatabaseProvider } from '../providers/database/database';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { ProfilePage } from '../pages/profile/profile';
import { ParallaxHeaderDirective } from '../directives/parallax/parallax';
import { EventsPage } from '../pages/events/events';
import { AddEventPage } from '../pages/add-event/add-event';
import { MychatsPage } from '../pages/mychats/mychats';
import { EventInfoPage } from '../pages/event-info/event-info';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireModule } from 'angularfire2';
import { ChatPage } from '../pages/chat/chat';
var config = {
  apiKey: "AIzaSyCTJT08mbl9Vpp7x2G0WSrQpjf-0sRTEbY",
  authDomain: "chat-c50e8.firebaseapp.com",
  databaseURL: "https://chat-c50e8.firebaseio.com",
  projectId: "chat-c50e8",
  storageBucket: "chat-c50e8.appspot.com",
  messagingSenderId: "101050978336"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    ParallaxHeaderDirective,
    EventsPage,
    MychatsPage,
    EventInfoPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    EventsPage,
    MychatsPage,
    EventInfoPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    Geolocation
  ]
})
export class AppModule {}
