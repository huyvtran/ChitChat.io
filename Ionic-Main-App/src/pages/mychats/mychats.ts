import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ChatPage } from '../chat/chat';
import { AuthService } from '../../providers/auth-service/auth-service';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider, private auth: AuthService) {
    this.getEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MychatsPage');
  }
  clickEvent(event, i){
    alert("Hi")
    this.navCtrl.push(ChatPage, {
       username:"Michael"
     });
  }


  getEvents(){
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      this.myChats=new Array();
      if (rdy) {
       
          this.databaseprovider.getEveryEventForUser().then(data => {
              this.myChats = data;
              alert(this.myChats.length);
        
              
            })
      
      }

    })
  }

}
