import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user=new Array();
  you
  userID
  firstName
  lastName
  category
  button
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider) {
    this.userID=navParams.get('userID');
    this.you = this.databaseprovider.userID;
  
   this.getUser();
   this.databaseprovider.findFriendshipStatus(this.databaseprovider.userID,this.userID).then(data => {
    this.button = data;
 
    
  })
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }
  public closeModal(){
    
}
// requestFriend(){
//   if(this.button=="Friends"){
//     //allow user to remove friendship
//   }else if(this.button=="Cancel Request"){
//     //remove friendship request from friend table
//     this.databaseprovider.declineFriendship2(this.databaseprovider.userID,this.userID);
//     this.button="Send Friend Request";
//   }else if(this.button=="Accept Friend Request"){
//     //allow user to accept friend request
//     this.databaseprovider.acceptFriendship(this.userID);
//     this.button="Friends";
//   }else if(this.button=="Send Friend Request"){
//    this.databaseprovider.requestFriendship(this.databaseprovider.userID,this.userID);
//    this.button="Cancel Request";
//   }else if(this.button=="Edit Profile"){
//     //allow user to edit their info
//   }
// }
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
}
