import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from "angularfire2/database-deprecated";
import { EventInfoPage } from '../event-info/event-info';
import firebase from 'firebase';
/**
* Generated class for the ChatPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];
  eventID
  type
  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.username = this.navParams.get('username');
      this.eventID = this.navParams.get('eventID');
      this.type=this.navParams.get('chatType')
      if(this.type=="event"){
      this._chatSubscription = this.db.list('events/'+this.eventID+'/chat').subscribe( data => {
        this.messages = data;
      });}else if(this.type=="direct"){
        this._chatSubscription = this.db.list('DirectMessages/'+this.eventID+'/chat').subscribe( data => {
          this.messages = data;
        });
      }
    }
    openEventInfo(id){
     
      firebase.database().ref('events/').orderByKey().equalTo(id).once('child_added', (dataSnap) => {
  
      this.navCtrl.push(EventInfoPage, {
        title:dataSnap.val().eventName,
        desc:dataSnap.val().description,
        location:dataSnap.val().location,
        creatorID:dataSnap.val().creatorID,
        imageID:dataSnap.val().imageID,
        eventID:id
      })
    })}
    sendMessage() {
      if(this.type=="event"){
      this.db.list('events/'+this.eventID+'/chat').push({
        username: this.username,
        message: this.message
      }).then( () => {
        // message is sent
      })
      this.message = '';}else if(this.type=="direct"){
        this.db.list('DirectMessages/'+this.eventID+'/chat').push({
          username: this.username,
          message: this.message
        }).then( () => {
          // message is sent
        })
        this.message = '';
      }
    }

    ionViewDidLoad() {
    //   if(this.type=="event"){
    //   this.db.list('events/'+this.eventID+'/chat').push({
    //     specialMessage: true,
    //     message: `${this.username} has joined the room`
    //   });
    // }else if(this.type=="direct"){
    //   this.db.list('DirectMessages/'+this.eventID+'/chat').push({
    //     specialMessage: true,
    //     message: `${this.username} has joined the room`
    //   });
    // }
    }

    ionViewWillLeave(){
  //     if(this.type=="event"){
  //     this._chatSubscription.unsubscribe();
  //     this.db.list('events/'+this.eventID+'/chat').push({
  //       specialMessage: true,
  //       message: `${this.username} has left the room`
  //     });
  //   }else if(this.type=="direct"){
  //     this._chatSubscription.unsubscribe();
  //     this.db.list('DirectMessages/'+this.eventID+'/chat').push({
  //       specialMessage: true,
  //       message: `${this.username} has left the room`
  //     });
  //   }
  // }
    }
  }
