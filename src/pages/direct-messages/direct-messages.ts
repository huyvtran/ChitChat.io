import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { ChatPage } from '../chat/chat';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
/**
 * Generated class for the DirectMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-direct-messages',
  templateUrl: 'direct-messages.html',
})
export class DirectMessagesPage {
  userKey
  fllw: FirebaseListObservable<any[]>;
  fllwing: FirebaseListObservable<any[]>;
  followers=new Array()
  friends=new Array()
  peopleYouFollow=new Array()
  myChats=new Array();
  eventIDs=new Array();
  events=new Array()
  names=new Array()
  peopleInChat: FirebaseListObservable<any[]>;
  constructor(public db: AngularFireDatabase,public fAuth: AngularFireAuth,private modal:ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.getPeopleYouFollow()
    this.getEvents()
    this.getFriends()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectMessagesPage');
  }
  startChat(){
    const myModal = this.modal.create('MessageFollowersPage',{attendees:this.peopleYouFollow});
    myModal.present();
  }
  getFriends(){
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
      
     var userKey=dataSnap.key
     this.fllw=  this.db.list('userProfiles/'+userKey+'/followers')
    this.fllwing=this.db.list('userProfiles/'+userKey+'/following')
    this.fllw.subscribe(users=>{
      users.forEach(item=>{
        this.fllwing.subscribe(users2=>{
          users2.forEach(item2=>{
            if(item2.userID==item.userID){
              firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(item.userID).once('child_added', (dataSnap) => {
                this.friends.push(dataSnap.val())
              })
            }
          })
          
        })
        

       })
       
       
    });
    
    });

  }
  getFollowers(){
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
      
      this.userKey=dataSnap.key
      firebase.database().ref('userProfiles/'+this.userKey+'/followers').on('child_added', (dataSnap) => {
           
        this.followers.push(dataSnap.val())
      
      });
    
    });
  
  }
  getPeopleYouFollow(){
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
      
      this.userKey=dataSnap.key
      firebase.database().ref('userProfiles/'+this.userKey+'/following').on('child_added', (dataSnap) => {
           
        this.peopleYouFollow.push(dataSnap.val())
        
      });
    
    });
  
  
  }
  clickEvent(event, i){
    
    this.navCtrl.push(ChatPage, {
       username:this.fAuth.auth.currentUser.displayName,
       eventID:this.eventIDs[i],
       chatType:"direct"

     });
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
      firebase.database().ref('userProfiles/'+this.userKey+'/DMs').on('child_added', (dataSnap) => {
       var ids=new Array()
        this.eventIDs.push(dataSnap.val().messageID)

alert(dataSnap.val().messageID)
       this.peopleInChat=this.db.list('DirectMessages/'+dataSnap.val().messageID+'/users')
       this.peopleInChat.subscribe(users=>{
        
        users.forEach(item=>{
          
          //ids.push(item.userID)
          firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(item.userID).once('child_added', (dataSnap) => {
            
            var name=dataSnap.val().first+" "+ dataSnap.val().last+" ";
            if(dataSnap.val().userID!=this.fAuth.auth.currentUser.uid){
              alert(dataSnap.val().first+" "+ dataSnap.val().last)
            this.names.push(dataSnap.val().first+" "+ dataSnap.val().last)}
         //  dataSnap.val().photo;
            
          });
          
      

     
      
         })
         

      });

          firebase.database().ref('DirectMessages/').orderByKey().equalTo(dataSnap.val().messageID).on('child_added', (dataSnap) => {
          
            this.myChats.push(dataSnap.val())

            //this.keys.push(dataSnap.key)
          });
        
      });
    })
  

  }
}
