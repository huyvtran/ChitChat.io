import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DatabaseProvider } from './../../providers/database/database';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { DirectMessagesPage } from '../direct-messages/direct-messages';
import { ChatPage } from '../chat/chat';

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
  ch: FirebaseListObservable<any[]>;
  userKey: string;
  userKey2: string;
  attendeesIDs=new Array();
  attendees=new Array();
  chats=new Array();
  constructor(public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, public viewController:ViewController, private databaseprovider: DatabaseProvider,public fAuth: AngularFireAuth) {
    this.attendeesIDs=navParams.get('attendees');
   //this.chats=navParams.get('chats')
    for(var i =0;i<this.attendeesIDs.length;i++){
      firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.attendeesIDs[i].userID).on('child_added', (dataSnap) => {
      
        this.attendees.push(dataSnap.val())
        //this.keys.push(dataSnap.key)
      });
    }
  
      this.getChats()
    
  }
getChats(){
  firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
 
    this.userKey=dataSnap.key
    
    firebase.database().ref('userProfiles/'+this.userKey+'/DMs').on('child_added', (dataSnap) => {
this.chats.push(dataSnap.val().messageID)
    })
  })
}
  ionViewDidLoad() {

  
  }
  clickPerson(a, i){
    var add=true
  for(var z=0;z<this.chats.length;z++){
   
    firebase.database().ref('DirectMessages/'+this.chats[i]+'/users').on('child_added', (dataSnap) => {

  if(a.userID==dataSnap.val().userID){
    this.navCtrl.push(ChatPage, {
      username:this.fAuth.auth.currentUser.displayName,
      eventID:this.chats[z],
      chatType:"direct"

    });
    add=false
  }
    })
    
 
  }
  if(add==true){
    this.db.list('DirectMessages/').push({
      
    }).then((message)=>{
      firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
 
        this.userKey=dataSnap.key
        firebase.database().ref('userProfiles/'+this.userKey+'/DMs').on('child_added', (dataSnap) => {

        })
       
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
      this.navCtrl.push(ChatPage, {
        username:this.fAuth.auth.currentUser.displayName,
        eventID:message.key,
        chatType:"direct"
  
      });

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
}
