import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LocationSelectPage } from '../pages/location-select/location-select';
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
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { ChatPage } from '../pages/chat/chat';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { Network } from '@ionic-native/network';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';

  const config = {
    apiKey: "AIzaSyCNATg5Q8TZqnxW3PhaqdMNfan9zobQMTs",
    authDomain: "coms-309.firebaseapp.com",
    databaseURL: "https://coms-309.firebaseio.com",
    projectId: "coms-309",
    storageBucket: "coms-309.appspot.com",
    messagingSenderId: "769505137443"
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
    ChatPage,
    LocationSelectPage,
    AddEventPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
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
    ChatPage,
    LocationSelectPage,
    AddEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    Geolocation,
    ConnectivityServiceProvider,
    GoogleMapsProvider,
    Network,
    FirebaseProvider,
    AuthProvider
  ]
})
export class AppModule {}
