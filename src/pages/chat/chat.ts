import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from "angularfire2/database-deprecated";
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
  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.username = this.navParams.get('username');
      this.eventID = this.navParams.get('eventID');
      this._chatSubscription = this.db.list('events/'+this.eventID+'/chat').subscribe( data => {
        this.messages = data;
      });
    }

    sendMessage() {
      this.db.list('events/'+this.eventID+'/chat').push({
        username: this.username,
        message: this.message
      }).then( () => {
        // message is sent
      })
      this.message = '';
    }

    ionViewDidLoad() {
      this.db.list('events/'+this.eventID+'/chat').push({
        specialMessage: true,
        message: `${this.username} has joined the room`
      });
    }

    ionViewWillLeave(){
      this._chatSubscription.unsubscribe();
      this.db.list('events/'+this.eventID+'/chat').push({
        specialMessage: true,
        message: `${this.username} has left the room`
      });
    }
  }
