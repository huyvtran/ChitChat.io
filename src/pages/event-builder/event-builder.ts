import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController,ModalController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsPage } from '../../pages/events/events';
import { EventCreateProvider } from '../../providers/event-create/event-create';
import { LocationSelectPage} from '../location-select/location-select';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
/**
 * Generated class for the EventbuilderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventbuilder',
  templateUrl: 'event-builder.html',
})

export class EventBuilderPage {
  userKey: string;
  public eventCreateForm: FormGroup;
  public loading: Loading;
  userID: any;
  start
  end
   startDate
   endDate
   location
   title
   startTime
   endTime
   desc
   friends:String
   event = {};
   events = new Array();
   allevents = new Array();
   max
   chart:any;
   pub
   followers=new Array()
   fol=new Array()
   invites=new Array()
   lat
   lng
   public myPhotosRef: any;
   public myPhoto: any;
   public myPhotoURL: any;
   imageID
   add=true;
  constructor(
    public eventProvider: EventCreateProvider,
    public navCtrl: NavController, 
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
   public modalCtrl: ModalController,
   public fAuth: AngularFireAuth,
   public db: AngularFireDatabase,
   private camera: Camera
   
  ) {
    this.imageID='null'
    this.userID=this.fAuth.auth.currentUser.uid;
    this.myPhotosRef = firebase.storage().ref('/Photos/');
    this.getFollowers()
      // this.eventCreateForm = formBuilder.group({
      //   eventName: [''],
      //   description: [''],
      //   location: [''],
      //   startDate: [''], 
      //   startTime: [''],
      //   endDate: [''],
      //   endTime: [''],
      //   lat:[''],
      //   lng:['']
      // });
    }
    
 

    takePhoto() {
      this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType:this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true
      }).then(imageData => {
        this.myPhoto = imageData;
        this.uploadPhoto();
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
    }
    selectPhoto(): void {
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
   
    private uploadPhoto(): void {
      this.imageID=this.generateUUID()
      this.myPhotosRef.child(this.imageID).child('image.png')
        .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
        .then((savedPicture) => {
          this.myPhotoURL = savedPicture.downloadURL;
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
    changeStartTime(){
  //     var end=new Date(this.startDate);
  // end.setTime(end.getTime()+60*60000);
  // this.endDate=end.toISOString();
      
    }
    changeStartDate(){}
    selectLocation(){
     
      let modal = this.modalCtrl.create(LocationSelectPage);
      modal.onDidDismiss((location) => {
        this.location=location.name;
        var myLatLng = {lat: location.lat, lng: location.lng};
        
        this.lat=location.lat;
        this.lng =location.lng
     
       
    });
      modal.present();   
    }

    loadUsers(){
      alert(this.followers.length)
      for(var i =0;i<this.followers.length;i++){
       alert(this.followers[i].userID)
        firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.followers[i].userID).on('child_added', (dataSnap) => {
         alert(dataSnap.val().first)
         
          this.fol.push(dataSnap.val())
          //this.keys.push(dataSnap.key)
        });
      }
    }
    getFollowers(){
      firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', (dataSnap) => {
        
        this.userKey=dataSnap.key
        firebase.database().ref('userProfiles/'+this.userKey+'/followers').on('child_added', (dataSnap) => {
             
          this.followers.push(dataSnap.val())
          firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(dataSnap.val().userID).on('child_added', (dataSnap) => {
            
            
             this.fol.push(dataSnap.val())
             //this.keys.push(dataSnap.key)
           });
       
        });
      
      })
    
    }
    
    createEvent(){
   alert(this.friends)
      this.eventProvider.createEvent(this.myPhotoURL,this.userID,this.title, this.desc, this.location, this.startDate, this.startTime, this.endDate, this.endTime,this.lat,this.lng,this.pub)
      .then(() => {
        
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(EventsPage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventbuilderPage');
  }

}
