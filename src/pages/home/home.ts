import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DatabaseProvider } from '../../providers/database/database';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { GoogleMapsClusterProvider } from '../../providers/google-maps-cluster/google-maps-cluster';
import { GoogleMaps } from '../../providers/google-maps2/google-maps2';
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  searchDisabled: boolean;
  saveDisabled: boolean;
  autocompleteService: any;
  placesService: any;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  _chatSubscription;
  map: any;
  locations: object[] = [];
  constructor(public db: AngularFireDatabase,public navCtrl: NavController, public geolocation: Geolocation,public mapCluster: GoogleMapsClusterProvider, private auth: AuthService, private databaseprovider: DatabaseProvider, public maps: GoogleMaps) {
    databaseprovider.setUserID(this.auth.getUserInfo().userID);
    this._chatSubscription = this.db.list('/locations').subscribe( data => {
      this.locations = data;
      for(var i=0;i<this.locations.length;i++){
        alert("Hello");
        this.addMarker();
      }
    });
   
  }
  addMarker(){
    
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   alert(this.map.getCenter().lng)
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
 
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
      this.mapCluster.addCluster(map);
  });
 alert(mapLoaded)
  }
 
 
}