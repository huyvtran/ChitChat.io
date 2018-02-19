import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DatabaseProvider } from './../../providers/database/database';
import {ProfilePage} from '../profile/profile';

import { EventInfoPage } from '../event-info/event-info';
import { AddEventPage } from '../add-event/add-event';
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  username = '';
  email = '';
  events=new Array();
  allevents = new Array();
  add=true;
  userID: any;
  constructor(public navCtrl: NavController, private auth: AuthService, private databaseprovider: DatabaseProvider,private modal:ModalController,private toastCtrl: ToastController) {
    let info = this.auth.getUserInfo();
    this.username = info['firstname'];
    this.email = info['email'];
    this.userID=this.auth.getUserInfo().userID;
    databaseprovider.setUserID(this.auth.getUserInfo().userID);
    this.getEvents();
  }



  public clickAddEvent()
  {   this.navCtrl.push(AddEventPage, {
    userID:this.auth.getUserInfo().userID
   });

  }

  public clickProfile()
  {
      this.navCtrl.push(ProfilePage, {
       userID:this.auth.getUserInfo().userID
      });
  
  }

clickSports(){
  this.navCtrl.push(EventsPage, {
    userID:this.auth.getUserInfo().userID,
    events:this.events,
    title:"Sports"
   });
}

  getEvents(){
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      this.events=new Array();
      if (rdy) {
       
          this.databaseprovider.getEvents().then(data => {
              this.events = data;
        
              
            })
      
      }

    })
  }

  clickEvent(event, i){
    this.navCtrl.push(EventInfoPage, {
      title: event.title,
      desc:event.desc,
      location:event.location,
      eventID:event.eventID,
      button:"Join",
      userID:event.userID,
      usereventID:event.usereventID
  });
  }

  public addEvent(event,i){
  
    // this.event=new EventProvider("Hello",1,1,"An event",this.date);
    
    // alert(this.event.date);
        //this.databaseprovider.addEvent(this.developer['name'], this.developer['skill'], parseInt(this.developer['yearsOfExperience']))
        if(i!=undefined){
        var eventStartTime = new Date(event.start);
        eventStartTime.setHours(eventStartTime.getHours()-6);
        var eventEndTime = new Date(event.end);
        eventEndTime.setHours(eventEndTime.getHours()-6);
        var duration = (eventEndTime.valueOf()) - (eventStartTime.valueOf());
        var hours=duration/(60*60*1000);
         var start=eventStartTime.toISOString().slice(0, 16).replace('T', ' ');
         var end=eventEndTime.toISOString().slice(0, 16).replace('T', ' ');

          var testStart=new Date(event.start);
          var testEnd=new Date(event.end);
          //testStart.setHours(testStart.getHours()+6);
          //testEnd.setHours(testEnd.getHours()+6);
         this.databaseprovider.getEveryEventForUser().then(data => {
            this.allevents = data;
            for(var i=0; i<this.allevents.length;i++){
                   
                   var start=new Date(this.allevents[i].start);
                   var end = new Date(this.allevents[i].end);
                   
                   if((testStart>=start && testStart<=end) || (testEnd>=start && testEnd<=end) )
                   {
                    this.add=false;
                   }
            }
            if(this.add==true){
              //set add button to green
              alert("can add");
              this.databaseprovider.addEvent(event.userID,this.userID,event.title,event.desc, event.location,start,end,hours,"No")
              .then(data => {
               
                if(this.events.length>0){
                    this.databaseprovider.addUserToEvent(event.eventID,this.userID);
                    let toast = this.toastCtrl.create({
                        message: 'Event added successfully!',
                        duration: 3000,
                        position: 'bottom'
                      });
                      toast.present();
                    }
              });
            }else{
                let toast = this.toastCtrl.create({
                    message: 'Unable to add, you already have an event at this time.',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
            }
            
          })

     
    }
     // this.home.loadEventData();
     
  
  
   
  }

}
