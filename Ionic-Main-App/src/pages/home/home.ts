import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DatabaseProvider } from '../../providers/database/database';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;

  map: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation, private auth: AuthService, private databaseprovider: DatabaseProvider, public maps: GoogleMapsProvider,) {
    databaseprovider.setUserID(this.auth.getUserInfo().userID);
  }
  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, null).then(() => {
            


  });
 
  }
 
 
}