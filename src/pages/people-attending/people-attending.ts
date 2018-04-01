import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DatabaseProvider } from './../../providers/database/database';
import firebase from 'firebase';
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
  attendeesIDs=new Array();
  attendees=new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController:ViewController, private databaseprovider: DatabaseProvider) {
    this.attendeesIDs=navParams.get('attendees');
    for(var i =0;i<this.attendeesIDs.length;i++){
      firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.attendeesIDs[i].userID).on('child_added', (dataSnap) => {
      
        this.attendees.push(dataSnap.val())
        //this.keys.push(dataSnap.key)
      });
    }
  
      
    
  }

  ionViewDidLoad() {

  
  }
  clickPerson(a, i){
    this.navCtrl.push(ProfilePage, {
      userID: a.userID
     });
  }
}
