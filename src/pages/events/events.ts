import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {AddEventPage} from '../../pages/add-event/add-event'
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  userID
  title
  events=new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams,private modal:ModalController, private databaseprovider:DatabaseProvider) {
    this.userID=navParams.get('userID');
    this.events=navParams.get('events');
    this.title=navParams.get('title');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
  public clickAddEvent()
  {
  const myModal = this.modal.create('AddEventPage',{userID:this.userID});
  myModal.present();
  myModal.onDidDismiss(data => {

    this.databaseprovider.getEvents().then(data => {
      this.events = data;
      for(var i=0;i<this.events.length;i++){
        alert(this.events[i].title);
      }

      
    })

  
  
    });
  }

}
