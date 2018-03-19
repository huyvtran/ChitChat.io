import { Component, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { GoogleMapsClusterProvider } from '../../providers/google-maps-cluster/google-maps-cluster';
import { GoogleMaps1 } from '../../providers/google-maps/google-maps';
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
  locations=new Array();
  query: string = '';
  places: any = [];

  location: any; 
  constructor(public db: AngularFireDatabase,public navCtrl: NavController, public zone: NgZone,public geolocation: Geolocation,public mapCluster: GoogleMapsClusterProvider, private auth: AuthService, private databaseprovider: DatabaseProvider, public maps: GoogleMaps1) {
   // databaseprovider.setUserID(this.auth.getUserInfo().userID);
 
  }


  
  ionViewDidLoad(){
  
    
   
    
  }
  ionViewWillEnter(){
   
    this.loadMap();
 
    // firebase.database().ref('/events').on('child_added', (dataSnap) => {
    //   this.addMarker({lat:dataSnap.val().eventLat,lng:dataSnap.val().eventLng}, this.maps.map)
  
    //  });
  }

  loadMap(){
   
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
      
      this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
         // this.getMarkers();
            //this.mapCluster.addCluster(this.maps.map);
            //firebase.database().ref('/events').on('child_added', (dataSnap) => {
            // this.addMarker({lat:dataSnap.val().eventLat,lng:dataSnap.val().eventLng}, this.maps.map)
              // let marker = new google.maps.Marker({
              //   map: this.maps.map,
              //   animation: google.maps.Animation.DROP,
              //   position:{lat:dataSnap.val().eventLat,lng:dataSnap.val().eventLng}
              
              // });
             
              //let content = "<h4>"+dataSnap.val().eventName+"</h4>";         
             
              //this.addInfoWindow(marker, content);
          //  });
            
  });
 
  }
 
  selectPlace(place){
 
    this.places = [];

    let location = {
        lat: null,
        lng: null,
        name: place.name
    };

    this.placesService.getDetails({placeId: place.place_id}, (details) => {

        this.zone.run(() => {

            location.name = details.name;
            location.lat = details.geometry.location.lat();
            location.lng = details.geometry.location.lng();
            this.saveDisabled = false;

            this.maps.map.setCenter({lat: location.lat, lng: location.lng});

            this.location = location;

        });

    });

}

searchPlace(){
    
    this.saveDisabled = true;
  
    if(this.query.length > 0 && !this.searchDisabled) {
      
        let config = {
            types: ['geocode'],
            input: this.query
        }

        this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

            if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
              
                this.places = [];

                predictions.forEach((prediction) => {
                    this.places.push(prediction);
                });
            }

        });

    } else {
        this.places = [];
    }

}
}