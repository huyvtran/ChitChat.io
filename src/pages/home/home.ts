import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DatabaseProvider } from './../../providers/database/database';
import {ProfilePage} from '../profile/profile';
import {EventsPage} from '../events/events';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  events=new Array();
  constructor(public navCtrl: NavController, private auth: AuthService, private databaseprovider: DatabaseProvider,private modal:ModalController) {
    let info = this.auth.getUserInfo();
    this.username = info['firstname'];
    this.email = info['email'];
    databaseprovider.setUserID(this.auth.getUserInfo().userID);
    this.getEvents();
  }



  public clickAddEvent()
  {
  const myModal = this.modal.create('AddEventPage',{userID:this.auth.getUserInfo().userID});
  myModal.present();
  myModal.onDidDismiss(data => {
    this.getEvents();
 //update events
  
  
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

}
