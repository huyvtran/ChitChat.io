import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DatabaseProvider } from './../../providers/database/database';
/**
 * Generated class for the PeopleAttendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-people-attending',
  templateUrl: 'people-attending.html',
})
export class PeopleAttendingPage {
  attendees=new Array();


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController:ViewController, private databaseprovider: DatabaseProvider) {
    this.attendees=navParams.get('attendees');
    
  
      
    
  }

  ionViewDidLoad() {

  
  }
  clickPerson(a, i){
    this.navCtrl.push(ProfilePage, {
      userID: a.userID
     });
  }
}
