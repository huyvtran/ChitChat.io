import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { DatabaseProvider } from './../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()

@Component({

  selector: 'settings-page',
  templateUrl: 'settings.html'

})
export class SettingsPage {

  nEnable

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public nativeStorage: NativeStorage,
  ){}

  //change user then go to login page
  logOut(){
  //TODO Change user or does it do it when going back to login page?
    this.navCtrl.setRoot(LoginPage);//goes to login page
    this.navCtrl.popToRoot;
  }

  //Toggles notifications to local storage
  toggleNotifications() {

    console.log(this.nEnable);

    
    
    if(this.nEnable == true){
      
      this.nativeStorage.setItem('notificationEnable', {value: 'true'}).then(
       data => console.log('stored as ' + data.value),
        error => console.error('Error storing item', error)
      );
      
    } else {
      
      this.nativeStorage.setItem('notificationEnable', {value: 'false'}).then(
        data => console.log('stored as ' + data.value),
        
        error => console.error('Error storng item', error)
      );
      
    }
  }

  // toggleMap() {
  //   //TODO same as Notifications
  //   if(NativeStorage.getItem('mapEnable') == null){
  //     NativeStorage.setItem('mapEnable', "false");
  //   }
  //   if(NativeStorage.getItem('mapEnable') == "true"){
  //     NativeStorage.setItem('mapEnable', "false");
  //   } else {
  //     NativeStorage.setItem('mapEnable', "true");
  //   }
  // }
}
