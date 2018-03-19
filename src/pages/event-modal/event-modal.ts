import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase, { database } from 'firebase';
/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ViewController) {
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
   
  //  if(this.creatorID==this.fAuth.auth.currentUser.uid){
  //      this.buttonTxt="Delete"

  //  }else{this.buttonTxt="Join"}
  }
public closeModal(){
    this.modalCtrl.dismiss();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

}
