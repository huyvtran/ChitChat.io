import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ProfilePage } from '../profile/profile';

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
  usereventID
  user=new Array();
  attendees=new Array();
  friendship
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider,private toastCtrl: ToastController,private modal:ModalController) {
    this.title=navParams.get('title');
    this.start=navParams.get('start');
    this.end=navParams.get('end');
    this.desc=navParams.get('desc');
    this.location=navParams.get('location');
    this.eventID=navParams.get('eventID');
    this.button=navParams.get('button');
    this.userID=navParams.get('userID');
    this.usereventID=navParams.get('usereventID');
    alert(this.userID);
    this.getUser();
    this.getPeopleAttending();
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
  
       
        this.databaseprovider.getAttendees(this.eventID).then(data => {
            this.attendees = data;
            
        
          })
    
    

  
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
