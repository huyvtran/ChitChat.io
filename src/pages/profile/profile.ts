import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase} from "angularfire2/database-deprecated";
import { Camera } from '@ionic-native/camera';
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
  name
  imageID
  userKey
  isCurrentUser
  followers=new Array()
  peopleYouFollow=new Array()
  public myPhotosRef: any;
   public myPhoto: any;
   public myPhotoURL: string;
  constructor(public db: AngularFireDatabase,public fAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider,
    private camera: Camera,private modal:ModalController) {
   this.userID=navParams.get('userID');
    //this.you = this.databaseprovider.userID;
      
    if(this.userID==this.fAuth.auth.currentUser.uid){
      this.isCurrentUser=true
      this.button="Edit Profile"

  }else{
    this.isCurrentUser=false
    this.button="Follow"
  }
  this.getPeopleYouFollow()
  this.getFollowers()
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', (dataSnap) => {
      this.firstName=dataSnap.val().first;
      this.lastName=dataSnap.val().last;
      this.myPhotoURL=dataSnap.val().photo;
      this.userKey=dataSnap.key
    });
   //this.getUser();
  // this.databaseprovider.findFriendshipStatus(this.databaseprovider.userID,this.userID).then(data => {
    //this.button = data;
 
    
  //})
  this.myPhotosRef = firebase.storage().ref('/Photos/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }
  public closeModal(){
    
}
getFollowers(){
  firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', (dataSnap) => {
    
    this.userKey=dataSnap.key
    firebase.database().ref('userProfiles/'+this.userKey+'/followers').on('child_added', (dataSnap) => {
         
      this.followers.push(dataSnap.val())
      if(dataSnap.val().userID==this.fAuth.auth.currentUser.uid){
        this.button="Following"
      }
    });
  
  });

}
openFollowing(){
  const myModal = this.modal.create('PeopleAttendingPage',{attendees:this.peopleYouFollow});
myModal.present();
}
openFollowers(){
  const myModal = this.modal.create('PeopleAttendingPage',{attendees:this.followers});
  myModal.present();
}
getPeopleYouFollow(){
  firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', (dataSnap) => {
    
    this.userKey=dataSnap.key
    firebase.database().ref('userProfiles/'+this.userKey+'/following').on('child_added', (dataSnap) => {
         
      this.peopleYouFollow.push(dataSnap.val())
      
    });
  
  });


}
addOrEdit(){
  if(this.button=="Follow"){
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
    
      this.userKey=dataSnap.key
      this.db.list('userProfiles/'+this.userKey+'/following').push({
        userID:this.userID
      })
  
    });
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', (dataSnap) => {
    
      this.userKey=dataSnap.key
      this.db.list('userProfiles/'+this.userKey+'/followers').push({
        userID:this.fAuth.auth.currentUser.uid
      })
    
    });
    this.button="Following"
  }else if(this.button=="Edit Profile"){

  }
}

setPhoto(){
  firebase.database().ref('userProfiles/'+this.userKey).update({photo:this.myPhotoURL})

}
private uploadPhoto(): void {
  this.imageID=this.generateUUID()
  this.myPhotosRef.child(this.imageID).child('image.png')
    .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
    .then((savedPicture) => {
      this.myPhotoURL = savedPicture.downloadURL;
      this.setPhoto()
    });
}

private generateUUID(): any {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
selectPhoto(): void {
  if(this.isCurrentUser==true){
  this.camera.getPicture({
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 100,
    encodingType: this.camera.EncodingType.PNG,
  }).then(imageData => {
    this.myPhoto = imageData;
   
    this.uploadPhoto();
  }, error => {
    console.log("ERROR -> " + JSON.stringify(error));
  });
}
}
ionViewWillLoad(){

//this.name=this.fAuth.auth.currentUser.displayName;
}
ionViewWillEnter(){}
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
  // this.databaseprovider.getDatabaseState().subscribe(rdy => {
  //   this.user=new Array();
  //   if (rdy) {
       
  //       this.databaseprovider.getUser(this.userID).then(data => {
  //           this.user = data;
  //           for(var i=0;i<this.user.length;i++)
  //           {
  //             this.firstName=this.user[i].firstName;
  //             this.lastName=this.user[i].lastName;
  //           }
            
  //         })
    
  //   }

  // })



}
}
