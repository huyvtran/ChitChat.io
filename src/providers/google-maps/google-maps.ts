import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import {  ModalController } from 'ionic-angular';
import { ConnectivityServiceProvider} from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
//import { EventInfoPage } from '../../pages/event-info/event-info';
@Injectable()
export class GoogleMaps1 {
  peopleYouFollow: FirebaseListObservable<any[]>;
  pplYouFollow=new Array()
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyBOzEUuY8CtG_Iq61bLQj6wVCcePsO_mn0";
  userKey: string;
  constructor(public db: AngularFireDatabase,public fAuth: AngularFireAuth,public connectivityService: ConnectivityServiceProvider, public geolocation: Geolocation, public modal:ModalController) {
 
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
          }
 
          document.body.appendChild(script); 
 
        }
      } else {
 
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
        resolve(true);
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
 
  initMap(): Promise<any> {
   
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
      this.geolocation.getCurrentPosition().then((position) => {
 
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
        this.map = new google.maps.Map(this.mapElement, {
          center: latLng,
          zoom: 15,
          disableDefaultUI:true,
          styles: [
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#fff9f0"
                }
              ]
            },
            {
              "featureType": "landscape.natural.terrain",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#43ff8d"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#43ff8d"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#fffff7"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#ffd5af"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#69daff"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "weight": 2
                }
              ]
            }
          ]
        });
       
 
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
     
            this.getPeopleYouFollow();
     
          
        });
        resolve(true);
 
      });
 
    });
 
  }
  getPeopleYouFollow():any{
    this.pplYouFollow=new Array()
   firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
     
     this.userKey=dataSnap.key
     this.peopleYouFollow=  this.db.list('userProfiles/'+this.userKey+'/following')
          this.peopleYouFollow.subscribe(users=>{
            users.forEach(item=>{
              this.pplYouFollow.push(item.userID)
 
             })
             
             this.getMarkers()
          });
          
     
     })
   
  

   
 
 
 }
  getMarkers(){
    firebase.database().ref('/events').on('child_added', (dataSnap) => {
      var offset=new Date().getTimezoneOffset()/60
      var startDate=new Date(dataSnap.val().eventStartDate+' '+dataSnap.val().eventStartTime)
      var endDate=new Date(dataSnap.val().eventEndDate+' '+dataSnap.val().eventEndTime)
     startDate.setHours(startDate.getHours()-offset)
     endDate.setHours(endDate.getHours()-offset) 
      var currentTime= new Date();
       currentTime.setHours(currentTime.getHours()-offset)
 var add=false
      if(currentTime>startDate && currentTime<endDate ){
        for(var i=0;i<this.pplYouFollow.length;i++){
          
          if(this.pplYouFollow[i]==dataSnap.val().creatorID){
            this.addMarker({lat:dataSnap.val().eventLat,lng:dataSnap.val().eventLng}, this.map,dataSnap.val().eventName, dataSnap.val(),dataSnap.key)
            add=true;
          }
        }if(add==false && dataSnap.val().public=="yes"){
          this.addMarker({lat:dataSnap.val().eventLat,lng:dataSnap.val().eventLng}, this.map,dataSnap.val().eventName, dataSnap.val(),dataSnap.key)
          add=true
        }else if(dataSnap.val().creatorID==this.fAuth.auth.currentUser.uid && add==false){
          this.addMarker({lat:dataSnap.val().eventLat,lng:dataSnap.val().eventLng}, this.map,dataSnap.val().eventName, dataSnap.val(),dataSnap.key)
          add=true
        }
         
      }
            
         });
   
     }
     addMarker(location, map,title,eventData,key) {
      var marker = new google.maps.Marker({
          position: location,
          
          
      });
      marker.setMap(map);
       let content = "<h4>"+title+"</h4>";         
             
              this.addInfoWindow(marker, content,eventData,key);
    }
    addInfoWindow(marker, content,eventData,key){
 
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
     
      google.maps.event.addListener(marker, 'click', () => {
        var data={      title:eventData.eventName,
             desc:eventData.description,
             location:eventData.location,
             creatorID:eventData.creatorID,
             imageID:eventData.imageID,
            eventID:key}
        var modal= this.modal.create('EventModalPage',data)
        modal.present()
        // this.navCtrl.push(EventInfoPage, {
     
        // })
        //infoWindow.open(this.map, marker);
      });
     
    }
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    this.connectivityService.watchOnline().subscribe(() => {
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    });
 
    this.connectivityService.watchOffline().subscribe(() => {
 
      this.disableMap();
 
    });
 
  }
 
}