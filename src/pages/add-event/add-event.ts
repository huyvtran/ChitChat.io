import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { AuthService } from './../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { LocationSelectPage } from '../location-select/location-select';
//import {HomePage} from '../home/home';
/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
 userID: any;
 start
 end
  startDate
  endDate
  location
  title
  desc
  event = {};
  events = new Array();
  allevents = new Array();
  max
  chart:any;
  pub
  add=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController:ViewController,private databaseprovider: DatabaseProvider, private toastCtrl: ToastController, public modalCtrl: ModalController) {
        this.startDate=new Date().toISOString();
        this.endDate=new Date().toISOString();
        var m=new Date(this.startDate);
        m.setDate(m.getDate()+3650);
        this.max=m.toISOString();
        this.userID=navParams.get('userID');
        
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

   public closeModal(){
    this.viewController.dismiss();
}
setUserID(id){
  this.userID=id;
}
 public addEvent(){
  
  // this.event=new EventProvider("Hello",1,1,"An event",this.date);
  
  // alert(this.event.date);
      //this.databaseprovider.addEvent(this.developer['name'], this.developer['skill'], parseInt(this.developer['yearsOfExperience']))

      var eventStartTime = new Date(this.startDate);
      
      var eventEndTime = new Date(this.endDate);
      var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
      var hours=duration/(60*60*1000);
       var start=eventStartTime.toISOString().slice(0, 16).replace('T', ' ');
      
       var end=eventEndTime.toISOString().slice(0, 16).replace('T', ' ');
       var add=true;
       this.start=start;
       this.end=end;
       var theeventID=new Array();
     if(this.add==true){
    this.databaseprovider.addEvent(this.userID,this.userID,this.title,this.desc, this.location,start,end,hours,this.pub)
    .then(data => {
      //get last event id entered
      //then add user to that event
      this.databaseprovider.getLastEventEntered()
      .then(data => {
        theeventID=data;
        var id;
        for(var i=0;i<theeventID.length;i++){
          id=theeventID[i].id;
        }
        //get last event id entered
        //then add user to that event
        //hello
        
        this.databaseprovider.addUserToEvent(id,this.userID);
        this.loadEventData();
        this.closeModal();
      });
      
      
    });
    
    this.event = {};
   // this.home.loadEventData();
   
    
  }else{
    let toast = this.toastCtrl.create({
      message: 'Unable to add, you already have an event at this time.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

 
}
loadEventData() {
  this.databaseprovider.selectAllFromUserEvents().then(data => {
    this.events = data;
    

    
  
    
    
  })
}
changeStart(ionicButton){
  var end=new Date(this.startDate);
  end.setTime(end.getTime()+60*60000);
  this.endDate=end.toISOString();


  var eventStartTime = new Date(this.startDate);
  eventStartTime.setHours(eventStartTime.getHours()+6);
  var eventEndTime = new Date(this.endDate);
  eventEndTime.setHours(eventEndTime.getHours()+6);
   
   this.add=true;

   this.databaseprovider.getEveryEventForUser().then(data => {
    this.allevents = data;
    for(var i=0; i<this.allevents.length;i++){
         
           var start=new Date(this.allevents[i].start);
           var end = new Date(this.allevents[i].end);

           if((eventStartTime>=start && eventStartTime<=end) || (eventEndTime>=start && eventEndTime<=end) )
           {
            this.add=false;
           }
    }
    if(this.add==true){
      //set add button to green
      ionicButton.color='secondary';
    }else{
      //set add button to red
      ionicButton.color='danger';
    }
    
  })
}
launchLocationPage(){
 
  let modal = this.modalCtrl.create(LocationSelectPage);

  modal.onDidDismiss((location) => {
      console.log(location);
  });

  modal.present();   

}
}
