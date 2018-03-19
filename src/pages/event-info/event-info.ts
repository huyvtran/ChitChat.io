import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ProfilePage } from '../profile/profile';
import firebase, { database } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { EventsPage } from '../events/events';
/**
 * Generated class for the EventInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})
export class EventInfoPage {
  tabBarElement: any;
  eventID
  title
  start
  end
  desc
  location
  button
  userID
  firstName
  lastName
  creatorID
  usereventID
  imageID
  user=new Array();
  attendees=new Array();
  keys=new Array()
  friendship
  profilePic
  buttonTxt
  eventKey
  userKey
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  constructor(public fAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider,private toastCtrl: ToastController,private modal:ModalController,public db: AngularFireDatabase) {
    this.title=navParams.get('title');
    // this.start=navParams.get('start');
    // this.end=navParams.get('end');
    this.eventKey=navParams.get('eventID');
    this.creatorID=navParams.get('creatorID');
    this.desc=navParams.get('desc');
    this.imageID=navParams.get('imageID');
    this.location=navParams.get('location');
  this.myPhotoURL=navParams.get('imageID')
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.creatorID).once('child_added', (dataSnap) => {
      this.firstName=dataSnap.val().first;
      this.lastName=dataSnap.val().last;
      this.profilePic=dataSnap.val().photo
    });
   
   if(this.creatorID==this.fAuth.auth.currentUser.uid){
       this.buttonTxt="Delete"

   }else{this.buttonTxt="Join"}
   this.getPeopleAttending()
    // this.eventID=navParams.get('eventID');
    // this.button=navParams.get('button');
    // this.userID=navParams.get('userID');
    // this.usereventID=navParams.get('usereventID');
    // alert(this.userID);
    // this.getUser();
    // this.getPeopleAttending();
  }


  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ChartPopupPage');
  }
  public closeModal(){
    
}
viewAttendees(){
  const myModal = this.modal.create('PeopleAttendingPage',{attendees:this.attendees});
myModal.present();
}
removeEvent(){
 if(this.userID==this.databaseprovider.userID)
 {
   alert("Event was deleted");
   this.databaseprovider.removeEvent(this.eventID);
 }
this.databaseprovider.removeUserFromEvent(this.usereventID);
let toast = this.toastCtrl.create({
  message: 'Event was removed successfully',
  duration: 3000,
  position: 'bottom'
});
toast.present();
}

getPeopleAttending(){

    this.attendees=new Array();
    this.keys=new Array()
       
 
        firebase.database().ref('events/'+this.eventKey+'/users').on('child_added', (dataSnap) => {
         
          this.attendees.push(dataSnap.val())
          this.keys.push(dataSnap.key)
        });
    

  
}
joinOrDeleteEvent(){
if(this.buttonTxt=="Delete"){
 
firebase.database().ref('/events/'+this.eventKey).remove();
let toast = this.toastCtrl.create({
  message: 'Event was removed successfully',
  duration: 3000,
  position: 'bottom'
});
toast.present()
this.navCtrl.setRoot(EventsPage);
}else if(this.buttonTxt=="Join"){
  firebase.database().ref('/events/'+this.eventKey+'/users').push({
    userID:this.fAuth.auth.currentUser.uid
  })
  firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
    
    this.userKey=dataSnap.key
    this.db.list('userProfiles/'+this.userKey+'/events').push({
      evnt:this.eventKey
    })
  });
  let toast = this.toastCtrl.create({
    message: 'You joined this event successfully',
    duration: 3000,
    position: 'bottom'
  });
toast.present()
}


}

getUser(){
  this.databaseprovider.getDatabaseState().subscribe(rdy => {
    this.user=new Array();
    if (rdy) {
       
        this.databaseprovider.getUser(this.userID).then(data => {
            this.user = data;
            for(var i=0;i<this.user.length;i++)
            {
              this.firstName=this.user[i].firstName;
              this.lastName=this.user[i].lastName;
            }
            
          })
    
    }

  })
}
clickProfile(){
  this.navCtrl.push(ProfilePage, {
    userID:this.userID
   });
}


}
