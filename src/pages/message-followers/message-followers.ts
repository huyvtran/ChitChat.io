import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DatabaseProvider } from './../../providers/database/database';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { DirectMessagesPage } from '../direct-messages/direct-messages';

/**
 * Generated class for the MessageFollowersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-followers',
  templateUrl: 'message-followers.html',
})
export class MessageFollowersPage {

  userKey: string;
  userKey2: string;
  attendeesIDs=new Array();
  attendees=new Array();

  constructor(public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, public viewController:ViewController, private databaseprovider: DatabaseProvider,public fAuth: AngularFireAuth) {
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
    this.db.list('DirectMessages/').push({
      
    }).then((message)=>{
      firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
 
        this.userKey=dataSnap.key
       
       
      }).then(()=>{
        this.db.list('userProfiles/'+this.userKey+'/DMs').push({
          messageID:message.key
        })
      })
      firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(a.userID).once('child_added', (dataSnap) => {
 
        this.userKey2=dataSnap.key
       
       
      }).then(()=>{
        this.db.list('userProfiles/'+this.userKey2+'/DMs').push({
          messageID:message.key
        })
      })
      this.navCtrl.setRoot(DirectMessagesPage);

      this.db.list('DirectMessages/'+message.key+'/users').push({
        userID:a.userID
      }).then(()=>{
        this.db.list('DirectMessages/'+message.key+'/users').push({
          userID:this.fAuth.auth.currentUser.uid
        })
      })
    })
    // this.navCtrl.push(ProfilePage, {
    //   userID: a.userID
    //  });
  }

}
