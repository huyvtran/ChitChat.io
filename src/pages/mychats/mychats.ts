import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ChatPage } from '../chat/chat';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
/**
 * Generated class for the MychatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mychats',
  templateUrl: 'mychats.html',
})
export class MychatsPage {
  myChats=new Array();
  eventIDs=new Array();
  events=new Array()
  userKey
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider, private auth: AuthService,public fAuth: AngularFireAuth) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MychatsPage');
  }
  clickEvent(event, i){
    
    this.navCtrl.push(ChatPage, {
       username:this.fAuth.auth.currentUser.displayName,
       eventID:this.eventIDs[i],
       chatType:"event"

     });
  }

  ionViewWillEnter(){
    this.getEvents()
  }
  getEvents(){
    // this.databaseprovider.getDatabaseState().subscribe(rdy => {
    //   this.myChats=new Array();
    //   if (rdy) {
       
    //       this.databaseprovider.getEveryEventForUser().then(data => {
    //           this.myChats = data;
         
        
              
    //         })
      
    //   }

    // })
    this.eventIDs=new Array()
    this.myChats=new Array()
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
 
      this.userKey=dataSnap.key
     
     
    }).then(()=>{
      firebase.database().ref('userProfiles/'+this.userKey+'/events').on('child_added', (dataSnap) => {

        this.eventIDs.push(dataSnap.val().evnt)
       
          firebase.database().ref('events/').orderByKey().equalTo(dataSnap.val().evnt).on('child_added', (dataSnap) => {
          
            this.myChats.push(dataSnap.val())
            //this.keys.push(dataSnap.key)
          });
        
      });
    })
  

  }

}
