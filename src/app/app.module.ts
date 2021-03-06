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
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ChatPage } from '../pages/chat/chat';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import {  GoogleMaps1} from '../providers/google-maps/google-maps';
import { Network } from '@ionic-native/network';
import { GoogleMapsClusterProvider } from '../providers/google-maps-cluster/google-maps-cluster';
import { GoogleMaps} from '../providers/google-maps2/google-maps2';
import { EventCreateProvider } from '../providers/event-create/event-create';
import { EventBuilderPage } from '../pages/event-builder/event-builder';
import { AuthProvider } from '../providers/auth/auth';
import { EmailProvider } from '../providers/email/email';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { SettingsPage } from '../pages/settings/settings';
import { DirectMessagesPage } from '../pages/direct-messages/direct-messages';
import{ SocialSharing} from '@ionic-native/social-sharing'
import { Facebook } from '@ionic-native/facebook';
// Michael's Database
var config = {
  apiKey: "AIzaSyCTJT08mbl9Vpp7x2G0WSrQpjf-0sRTEbY",
  authDomain: "chat-c50e8.firebaseapp.com",
  databaseURL: "https://chat-c50e8.firebaseio.com",
  projectId: "chat-c50e8",
  storageBucket: "chat-c50e8.appspot.com",
  messagingSenderId: "101050978336"
};

// Liam's Database
    // const config = {
    //   apiKey: "AIzaSyCNATg5Q8TZqnxW3PhaqdMNfan9zobQMTs",
    //   authDomain: "coms-309.firebaseapp.com",
    //   databaseURL: "https://coms-309.firebaseio.com",
    //   projectId: "coms-309",
    //   storageBucket: "coms-309.appspot.com",
    //   messagingSenderId: "769505137443"
    // };


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
    AddEventPage,
    EventBuilderPage,
    SettingsPage,
    DirectMessagesPage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    AddEventPage,
    EventBuilderPage,
    SettingsPage,
    DirectMessagesPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    SocialSharing,
    Geolocation,
    ConnectivityServiceProvider,
    GoogleMaps1,
    Network,
    GoogleMapsClusterProvider,
    GoogleMaps,
    EventCreateProvider,
    AuthProvider,
    EmailProvider,
    Camera,
<<<<<<< src/app/app.module.ts
    NativeStorage
=======
    Facebook
>>>>>>> src/app/app.module.ts
  ]
})
export class AppModule {}
