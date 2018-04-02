webpackJsonp([11],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMaps1; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connectivity_service_connectivity_service__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { EventInfoPage } from '../../pages/event-info/event-info';
var GoogleMaps1 = (function () {
    function GoogleMaps1(connectivityService, geolocation, modal) {
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.modal = modal;
        this.mapInitialised = false;
        this.apiKey = "AIzaSyBOzEUuY8CtG_Iq61bLQj6wVCcePsO_mn0";
    }
    GoogleMaps1.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMaps1.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function () {
                            resolve(true);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit&libraries=places';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
                resolve(true);
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMaps1.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            _this.geolocation.getCurrentPosition().then(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                _this.map = new google.maps.Map(_this.mapElement, {
                    center: latLng,
                    zoom: 15,
                    disableDefaultUI: true,
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
                google.maps.event.addListenerOnce(_this.map, 'idle', function () {
                    _this.getMarkers();
                });
                resolve(true);
            });
        });
    };
    GoogleMaps1.prototype.getMarkers = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/events').on('child_added', function (dataSnap) {
            var offset = new Date().getTimezoneOffset() / 60;
            var startDate = new Date(dataSnap.val().eventStartDate + ' ' + dataSnap.val().eventStartTime);
            var endDate = new Date(dataSnap.val().eventEndDate + ' ' + dataSnap.val().eventEndTime);
            startDate.setHours(startDate.getHours() - offset);
            endDate.setHours(endDate.getHours() - offset);
            var currentTime = new Date();
            currentTime.setHours(currentTime.getHours() - offset);
            if (currentTime > startDate && currentTime < endDate) {
                _this.addMarker({ lat: dataSnap.val().eventLat, lng: dataSnap.val().eventLng }, _this.map, dataSnap.val().eventName, dataSnap.val(), dataSnap.key);
            }
        });
    };
    GoogleMaps1.prototype.addMarker = function (location, map, title, eventData, key) {
        var marker = new google.maps.Marker({
            position: location,
        });
        marker.setMap(map);
        var content = "<h4>" + title + "</h4>";
        this.addInfoWindow(marker, content, eventData, key);
    };
    GoogleMaps1.prototype.addInfoWindow = function (marker, content, eventData, key) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            var data = { title: eventData.eventName,
                desc: eventData.description,
                location: eventData.location,
                creatorID: eventData.creatorID,
                imageID: eventData.imageID,
                eventID: key };
            var modal = _this.modal.create('EventModalPage', data);
            modal.present();
            // this.navCtrl.push(EventInfoPage, {
            // })
            //infoWindow.open(this.map, marker);
        });
    };
    GoogleMaps1.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMaps1.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMaps1.prototype.addConnectivityListeners = function () {
        var _this = this;
        this.connectivityService.watchOnline().subscribe(function () {
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        });
        this.connectivityService.watchOffline().subscribe(function () {
            _this.disableMap();
        });
    };
    GoogleMaps1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_connectivity_service_connectivity_service__["a" /* ConnectivityServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], GoogleMaps1);
    return GoogleMaps1;
}());

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Event */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_builder_event_builder__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__event_info_event_info__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Event = (function () {
    function Event() {
    }
    return Event;
}());

var EventsPage = (function () {
    function EventsPage(fAuth, navCtrl, auth, databaseprovider, modal, toastCtrl) {
        this.fAuth = fAuth;
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.databaseprovider = databaseprovider;
        this.modal = modal;
        this.toastCtrl = toastCtrl;
        this.username = '';
        this.email = '';
        this.events = new Array();
        this.allevents = new Array();
        this.keys = new Array();
        this.add = true;
        // let info = this.auth.getUserInfo();
        // this.username = info['firstname'];
        // this.email = info['email'];
        // this.userID=this.auth.getUserInfo().userID;
        // databaseprovider.setUserID(this.auth.getUserInfo().userID);
        var t = new Date();
        t.setHours(t.getHours() - 5);
        this.today = t.toISOString();
        this.date = this.today.slice(0, 10);
        this.getEvents();
    }
    EventsPage_1 = EventsPage;
    EventsPage.prototype.deleteEvent = function (anEvent, i) {
        __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('/events/' + this.keys[i]).remove();
        this.events.splice(i, 1);
        this.keys.splice(i, 1);
        //   console.log(this.events[i]);
    };
    EventsPage.prototype.ionViewDidEnter = function () {
        //this.getEvents();
    };
    EventsPage.prototype.clickAddEvent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__event_builder_event_builder__["a" /* EventBuilderPage */], {});
    };
    EventsPage.prototype.clickProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */], {
            userID: this.fAuth.auth.currentUser.uid
        });
    };
    EventsPage.prototype.selectLocation = function () {
        // this.navCtrl.push(LocationSelectPage, {
        //   // userID:this.auth.getUserInfo().userID
        //   });
    };
    EventsPage.prototype.clickSports = function () {
        this.navCtrl.push(EventsPage_1, {
            userID: this.auth.getUserInfo().userID,
            events: this.events,
            title: "Sports"
        });
    };
    EventsPage.prototype.changeDate = function () {
        this.date = new Date(this.today).toISOString().slice(0, 10);
        this.events = new Array();
        this.keys = new Array();
        this.getEvents();
    };
    EventsPage.prototype.getEvents = function () {
        // this.databaseprovider.getDatabaseState().subscribe(rdy => {
        //   this.events=new Array();
        //   if (rdy) {
        var _this = this;
        //       this.databaseprovider.getEvents().then(data => {
        //           this.events = data;
        //         })
        //   }
        // })
        __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('events/').orderByChild('eventStartTime').on('child_added', function (dataSnap) {
            if (_this.date == dataSnap.val().eventStartDate) {
                _this.events.push(dataSnap.val());
                _this.keys.push(dataSnap.key);
            }
        });
    };
    EventsPage.prototype.clickEvent = function (event, i) {
        //   this.navCtrl.push(EventInfoPage, {
        //     title: event.title,
        //     desc:event.desc,
        //     location:event.location,
        //     eventID:event.eventID,
        //     button:"Join",
        //     userID:event.userID,
        //     usereventID:event.usereventID
        // });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__event_info_event_info__["a" /* EventInfoPage */], {
            title: event.eventName,
            desc: event.description,
            location: event.location,
            creatorID: event.creatorID,
            imageID: event.imageID,
            eventID: this.keys[i]
        });
    };
    EventsPage.prototype.addEvent = function (event, i) {
        // this.event=new EventProvider("Hello",1,1,"An event",this.date);
        // alert(this.event.date);
        //this.databaseprovider.addEvent(this.developer['name'], this.developer['skill'], parseInt(this.developer['yearsOfExperience']))
        //     if(i!=undefined){
        //     var eventStartTime = new Date(event.start);
        //     eventStartTime.setHours(eventStartTime.getHours()-6);
        //     var eventEndTime = new Date(event.end);
        //     eventEndTime.setHours(eventEndTime.getHours()-6);
        //     var duration = (eventEndTime.valueOf()) - (eventStartTime.valueOf());
        //     var hours=duration/(60*60*1000);
        //      var start=eventStartTime.toISOString().slice(0, 16).replace('T', ' ');
        //      var end=eventEndTime.toISOString().slice(0, 16).replace('T', ' ');
        //       var testStart=new Date(event.start);
        //       var testEnd=new Date(event.end);
        //       //testStart.setHours(testStart.getHours()+6);
        //       //testEnd.setHours(testEnd.getHours()+6);
        //      this.databaseprovider.getEveryEventForUser().then(data => {
        //         this.allevents = data;
        //         for(var i=0; i<this.allevents.length;i++){
        //                var start=new Date(this.allevents[i].start);
        //                var end = new Date(this.allevents[i].end);
        //                if((testStart>=start && testStart<=end) || (testEnd>=start && testEnd<=end) )
        //                {
        //                 this.add=false;
        //                }
        //         }
        //         if(this.add==true){
        //           //set add button to green
        //           alert("can add");
        //           this.databaseprovider.addEvent(event.userID,this.userID,event.title,event.desc, event.location,start,end,hours,"No")
        //           .then(data => {
        //             if(this.events.length>0){
        //                 this.databaseprovider.addUserToEvent(event.eventID,this.userID);
        //                 let toast = this.toastCtrl.create({
        //                     message: 'Event added successfully!',
        //                     duration: 3000,
        //                     position: 'bottom'
        //                   });
        //                   toast.present();
        //                 }
        //           });
        //         }else{
        //             let toast = this.toastCtrl.create({
        //                 message: 'Unable to add, you already have an event at this time.',
        //                 duration: 3000,
        //                 position: 'bottom'
        //               });
        //               toast.present();
        //         }
        //       })
        // }
        // this.home.loadEventData();
    };
    EventsPage = EventsPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-events',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/events/events.html"*/'<ion-header>\n  <ion-navbar>\n    <table class="icon-table">\n      <td><ion-icon id="notification-button" class="custom-icon" name="md-notifications" >\n         <ion-badge id="notifications-badge" color="danger">0</ion-badge>\n      </ion-icon></td>\n      <td><ion-icon class="custom-icon" name="md-contact" (click)="clickProfile()"></ion-icon></td>\n    </table> \n    <ion-title>Events</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n  <div ion-fixed id="dateheader">\n    <table id="datetable"style="text-align:center" >\n        <tr>\n         \n          \n          <td><ion-datetime  (ionChange)="changeDate()" displayFormat="MMMM DD, YYYY" [(ngModel)]="today" [max]="max" [min]="2015" ></ion-datetime></td>\n          \n          <td><ion-icon name="md-calendar"></ion-icon></td>\n        </tr>\n      </table>\n </div>\n <div class="main-content">\n        <ion-card  *ngFor="let event of events; let i= index"  >\n           \n            <ion-item (click)="clickEvent(event, i)"> \n             \n              \n              <h1>{{event.eventName}}</h1>\n              \n              \n              \n              \n            </ion-item>\n    \n            <img (click)="clickEvent(event, i)" src="{{event.imageID}}" />\n            <ion-card-content (click)="clickEvent(event, i)">\n             \n                <!-- <p >\n                  {{time[i].start}}-{{time[i].end}}\n                </p> -->\n          \n                <p>\n                 {{event.description}}\n                </p>\n                <ion-item>\n                    <ion-icon name=\'md-pin\' ></ion-icon>\n                    {{event.location}}\n                    </ion-item>\n              \n          \n              </ion-card-content>\n              <button  (click)="addEvent(event,i)" color="secondary" ion-button round outline item-end icon-left>\n                  <ion-icon name="add"></ion-icon>\n                  Join\n                </button>\n\n                <button  (click)="deleteEvent(event, i)" color="danger" ion-button round outline item-end icon-left>\n                    <ion-icon name="close"></ion-icon>\n                     Delete\n                  </button>\n          </ion-card>\n        </div>\n  \n  <ion-fab (click)="clickAddEvent()">\n    <button ion-fab><ion-icon class="custom-icon" name="add" ></ion-icon></button>\n  </ion-fab>\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/events/events.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], EventsPage);
    return EventsPage;
    var EventsPage_1;
}());

//# sourceMappingURL=events.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(191);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = (function () {
    function ProfilePage(db, fAuth, navCtrl, navParams, databaseprovider, camera, modal) {
        var _this = this;
        this.db = db;
        this.fAuth = fAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.databaseprovider = databaseprovider;
        this.camera = camera;
        this.modal = modal;
        this.user = new Array();
        this.followers = new Array();
        this.peopleYouFollow = new Array();
        this.userID = navParams.get('userID');
        //this.you = this.databaseprovider.userID;
        if (this.userID == this.fAuth.auth.currentUser.uid) {
            this.isCurrentUser = true;
            this.button = "Edit Profile";
        }
        else {
            this.isCurrentUser = false;
            this.button = "Follow";
        }
        this.getPeopleYouFollow();
        this.getFollowers();
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', function (dataSnap) {
            _this.firstName = dataSnap.val().first;
            _this.lastName = dataSnap.val().last;
            _this.myPhotoURL = dataSnap.val().photo;
            _this.userKey = dataSnap.key;
        });
        //this.getUser();
        // this.databaseprovider.findFriendshipStatus(this.databaseprovider.userID,this.userID).then(data => {
        //this.button = data;
        //})
        this.myPhotosRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref('/Photos/');
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.closeModal = function () {
    };
    ProfilePage.prototype.getFollowers = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', function (dataSnap) {
            _this.userKey = dataSnap.key;
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/' + _this.userKey + '/followers').on('child_added', function (dataSnap) {
                _this.followers.push(dataSnap.val());
                if (dataSnap.val().userID == _this.fAuth.auth.currentUser.uid) {
                    _this.button = "Following";
                }
            });
        });
    };
    ProfilePage.prototype.openFollowing = function () {
        var myModal = this.modal.create('PeopleAttendingPage', { attendees: this.peopleYouFollow });
        myModal.present();
    };
    ProfilePage.prototype.openFollowers = function () {
        var myModal = this.modal.create('PeopleAttendingPage', { attendees: this.followers });
        myModal.present();
    };
    ProfilePage.prototype.getPeopleYouFollow = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', function (dataSnap) {
            _this.userKey = dataSnap.key;
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/' + _this.userKey + '/following').on('child_added', function (dataSnap) {
                _this.peopleYouFollow.push(dataSnap.val());
            });
        });
    };
    ProfilePage.prototype.addOrEdit = function () {
        var _this = this;
        if (this.button == "Follow") {
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', function (dataSnap) {
                _this.userKey = dataSnap.key;
                _this.db.list('userProfiles/' + _this.userKey + '/following').push({
                    userID: _this.userID
                });
            });
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.userID).once('child_added', function (dataSnap) {
                _this.userKey = dataSnap.key;
                _this.db.list('userProfiles/' + _this.userKey + '/followers').push({
                    userID: _this.fAuth.auth.currentUser.uid
                });
            });
            this.button = "Following";
        }
        else if (this.button == "Edit Profile") {
        }
    };
    ProfilePage.prototype.setPhoto = function () {
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/' + this.userKey).update({ photo: this.myPhotoURL });
    };
    ProfilePage.prototype.uploadPhoto = function () {
        var _this = this;
        this.imageID = this.generateUUID();
        this.myPhotosRef.child(this.imageID).child('image.png')
            .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
            .then(function (savedPicture) {
            _this.myPhotoURL = savedPicture.downloadURL;
            _this.setPhoto();
        });
    };
    ProfilePage.prototype.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    ProfilePage.prototype.selectPhoto = function () {
        var _this = this;
        if (this.isCurrentUser == true) {
            this.camera.getPicture({
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                quality: 100,
                encodingType: this.camera.EncodingType.PNG,
            }).then(function (imageData) {
                _this.myPhoto = imageData;
                _this.uploadPhoto();
            }, function (error) {
                console.log("ERROR -> " + JSON.stringify(error));
            });
        }
    };
    ProfilePage.prototype.ionViewWillLoad = function () {
        //this.name=this.fAuth.auth.currentUser.displayName;
    };
    ProfilePage.prototype.ionViewWillEnter = function () { };
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
    ProfilePage.prototype.getUser = function () {
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
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/profile/profile.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>profile</ion-title>\n    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n\n   \n          <div class="header-image">\n              <ion-img id="profilePic"(click)="selectPhoto()" width="150" height="150" src={{myPhotoURL}}></ion-img>\n            \n             <h2 id="name-text">{{firstName}} {{lastName}}</h2>\n             <button ion-button  (click)="addOrEdit()">{{button}}</button>\n             <button ion-button (click)="openFollowers()"  block clear >Followers {{followers.length}}</button>\n             <button ion-button (click)="openFollowing()"  block clear >Following {{peopleYouFollow.length}}</button>\n             </div>\n             \n           \n    \n\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationSelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_google_maps__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocationSelectPage = (function () {
    function LocationSelectPage(navCtrl, zone, maps, platform, geolocation, viewCtrl) {
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.maps = maps;
        this.platform = platform;
        this.geolocation = geolocation;
        this.viewCtrl = viewCtrl;
        this.query = '';
        this.places = [];
        this.searchDisabled = true;
        this.saveDisabled = true;
    }
    LocationSelectPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
            _this.autocompleteService = new google.maps.places.AutocompleteService();
            _this.placesService = new google.maps.places.PlacesService(_this.maps.map);
            _this.searchDisabled = false;
        });
    };
    LocationSelectPage.prototype.selectPlace = function (place) {
        var _this = this;
        this.places = [];
        var location = {
            lat: null,
            lng: null,
            name: place.name
        };
        this.placesService.getDetails({ placeId: place.place_id }, function (details) {
            _this.zone.run(function () {
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                _this.saveDisabled = false;
                _this.maps.map.setCenter({ lat: location.lat, lng: location.lng });
                _this.location = location;
            });
        });
    };
    LocationSelectPage.prototype.searchPlace = function () {
        var _this = this;
        this.saveDisabled = true;
        if (this.query.length > 0 && !this.searchDisabled) {
            var config = {
                types: ['geocode'],
                input: this.query
            };
            this.autocompleteService.getPlacePredictions(config, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                    _this.places = [];
                    predictions.forEach(function (prediction) {
                        _this.places.push(prediction);
                    });
                }
            });
        }
        else {
            this.places = [];
        }
    };
    LocationSelectPage.prototype.save = function () {
        this.viewCtrl.dismiss(this.location);
    };
    LocationSelectPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], LocationSelectPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], LocationSelectPage.prototype, "pleaseConnect", void 0);
    LocationSelectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-location-select',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/location-select/location-select.html"*/'<ion-header>\n  <ion-navbar color="primary">\n      <ion-buttons left>\n          <button ion-button (click)="close()">Cancel</button>\n      </ion-buttons>\n      <ion-buttons right>\n          <button [disabled]="saveDisabled" ion-button (click)="save()">Save</button>\n      </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar>\n      <ion-searchbar [(ngModel)]="query" (ionInput)="searchPlace()"></ion-searchbar>\n  </ion-toolbar>\n\n  <ion-list>\n      <ion-item *ngFor="let place of places" (touchstart)="selectPlace(place)">{{place.description}}</ion-item>\n  </ion-list>\n\n</ion-header>\n\n<ion-content>\n\n  <div #pleaseConnect id="please-connect">\n      <p>Please connect to the Internet...</p>\n  </div>\n\n  <div #map id="map">\n      <ion-spinner></ion-spinner>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/location-select/location-select.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_google_maps__["a" /* GoogleMaps1 */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* ViewController */]])
    ], LocationSelectPage);
    return LocationSelectPage;
}());

//# sourceMappingURL=location-select.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectivityServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectivityServiceProvider = (function () {
    function ConnectivityServiceProvider(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('cordova');
    }
    ConnectivityServiceProvider.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type != 'none';
        }
        else {
            return navigator.onLine;
        }
    };
    ConnectivityServiceProvider.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type == 'none';
        }
        else {
            return !navigator.onLine;
        }
    };
    ConnectivityServiceProvider.prototype.watchOnline = function () {
        return this.network.onConnect();
    };
    ConnectivityServiceProvider.prototype.watchOffline = function () {
        return this.network.onDisconnect();
    };
    ConnectivityServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
    ], ConnectivityServiceProvider);
    return ConnectivityServiceProvider;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventBuilderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_events_events__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_event_create_event_create__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__location_select_location_select__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database_deprecated__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the EventbuilderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventBuilderPage = (function () {
    function EventBuilderPage(eventProvider, navCtrl, formBuilder, loadingCtrl, alertCtrl, modalCtrl, fAuth, db, camera) {
        this.eventProvider = eventProvider;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.fAuth = fAuth;
        this.db = db;
        this.camera = camera;
        this.event = {};
        this.events = new Array();
        this.allevents = new Array();
        this.add = true;
        this.imageID = 'null';
        this.userID = this.fAuth.auth.currentUser.uid;
        this.myPhotosRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.storage().ref('/Photos/');
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
    EventBuilderPage.prototype.takePhoto = function () {
        var _this = this;
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.PNG,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            _this.myPhoto = imageData;
            _this.uploadPhoto();
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    EventBuilderPage.prototype.selectPhoto = function () {
        var _this = this;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            encodingType: this.camera.EncodingType.PNG,
        }).then(function (imageData) {
            _this.myPhoto = imageData;
            _this.uploadPhoto();
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    EventBuilderPage.prototype.uploadPhoto = function () {
        var _this = this;
        this.imageID = this.generateUUID();
        this.myPhotosRef.child(this.imageID).child('image.png')
            .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
            .then(function (savedPicture) {
            _this.myPhotoURL = savedPicture.downloadURL;
        });
    };
    EventBuilderPage.prototype.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    EventBuilderPage.prototype.changeStartTime = function () {
        //     var end=new Date(this.startDate);
        // end.setTime(end.getTime()+60*60000);
        // this.endDate=end.toISOString();
    };
    EventBuilderPage.prototype.changeStartDate = function () { };
    EventBuilderPage.prototype.selectLocation = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__location_select_location_select__["a" /* LocationSelectPage */]);
        modal.onDidDismiss(function (location) {
            _this.location = location.name;
            var myLatLng = { lat: location.lat, lng: location.lng };
            _this.lat = location.lat;
            _this.lng = location.lng;
        });
        modal.present();
    };
    EventBuilderPage.prototype.createEvent = function () {
        var _this = this;
        this.eventProvider.createEvent(this.myPhotoURL, this.userID, this.title, this.desc, this.location, this.startDate, this.startTime, this.endDate, this.endTime, this.lat, this.lng)
            .then(function () {
            _this.loading.dismiss().then(function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_events_events__["a" /* EventsPage */]);
            });
        }, function (error) {
            _this.loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
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
    };
    EventBuilderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventbuilderPage');
    };
    EventBuilderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-eventbuilder',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/event-builder/event-builder.html"*/'<!--\n  Generated template for the EventbuilderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Create an Event</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  \n  <ion-item>\n    <ion-row>\n      <ion-col width-50>\n        <button ion-button color="danger" type="button" full round large (click)="takePhoto()">\n                    <ion-icon name="md-camera"></ion-icon>\n                </button>\n      </ion-col>\n      <ion-col width-50>\n        <button ion-button color="secondary" type="button" full round large (click)="selectPhoto()">\n                    <ion-icon name="md-image"></ion-icon>\n                </button>\n      </ion-col>\n    </ion-row>\n  </ion-item>\n  <ion-item>\n    <img class="img-responsive" src="{{ myPhotoURL }}" />\n  </ion-item>\n      <ion-item>\n          <ion-label color="primary">Title</ion-label>\n          <ion-input [(ngModel)]="title" placeholder="Title"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label color="primary">Description</ion-label>\n          <ion-input [(ngModel)]="desc" placeholder="Description"></ion-input>\n        </ion-item>\n        <ion-item (click)="selectLocation()">\n          <ion-label color="primary">Location</ion-label>\n          <ion-input [(ngModel)]="location" placeholder="Location"></ion-input>\n        </ion-item>\n    <ion-item>\n      <ion-label stacked>Event Start Date</ion-label>\n      <ion-input (ionChange)="changeStartDate()" [(ngModel)]="startDate" type="date" placeholder="xx/xx/xxxx" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>Event Start Time</ion-label>\n      <ion-input (ionChange)="changeStartTime()"  [(ngModel)]="startTime" type="time" required="required"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label stacked>Event End Date</ion-label>\n        <ion-input [(ngModel)]="endDate" type="date" placeholder="xx/xx/xxxx" required="required"></ion-input>\n      </ion-item>\n\n    <ion-item>\n        <ion-label stacked>Event End Time</ion-label>\n        <ion-input [(ngModel)]="endTime" type="time" required="required"></ion-input>\n      </ion-item>\n\n      <button ion-button full #btn (click)="createEvent()">Add</button>\n</ion-content>'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/event-builder/event-builder.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_event_create_event_create__["a" /* EventCreateProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database_deprecated__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]])
    ], EventBuilderPage);
    return EventBuilderPage;
}());

//# sourceMappingURL=event-builder.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__events_events__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the EventInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventInfoPage = (function () {
    function EventInfoPage(fAuth, navCtrl, navParams, databaseprovider, toastCtrl, modal, db) {
        var _this = this;
        this.fAuth = fAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.databaseprovider = databaseprovider;
        this.toastCtrl = toastCtrl;
        this.modal = modal;
        this.db = db;
        this.user = new Array();
        this.attendees = new Array();
        this.keys = new Array();
        this.title = navParams.get('title');
        // this.start=navParams.get('start');
        // this.end=navParams.get('end');
        this.eventKey = navParams.get('eventID');
        this.creatorID = navParams.get('creatorID');
        this.desc = navParams.get('desc');
        this.imageID = navParams.get('imageID');
        this.location = navParams.get('location');
        this.myPhotoURL = navParams.get('imageID');
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.creatorID).once('child_added', function (dataSnap) {
            _this.firstName = dataSnap.val().first;
            _this.lastName = dataSnap.val().last;
            _this.profilePic = dataSnap.val().photo;
        });
        if (this.creatorID == this.fAuth.auth.currentUser.uid) {
            this.buttonTxt = "Delete";
        }
        else {
            this.buttonTxt = "Join";
        }
        this.getPeopleAttending();
        // this.eventID=navParams.get('eventID');
        // this.button=navParams.get('button');
        // this.userID=navParams.get('userID');
        // this.usereventID=navParams.get('usereventID');
        // alert(this.userID);
        // this.getUser();
        // this.getPeopleAttending();
    }
    EventInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChartPopupPage');
    };
    EventInfoPage.prototype.closeModal = function () {
    };
    EventInfoPage.prototype.viewAttendees = function () {
        var myModal = this.modal.create('PeopleAttendingPage', { attendees: this.attendees });
        myModal.present();
    };
    EventInfoPage.prototype.removeEvent = function () {
        if (this.userID == this.databaseprovider.userID) {
            alert("Event was deleted");
            this.databaseprovider.removeEvent(this.eventID);
        }
        this.databaseprovider.removeUserFromEvent(this.usereventID);
        var toast = this.toastCtrl.create({
            message: 'Event was removed successfully',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    EventInfoPage.prototype.getPeopleAttending = function () {
        var _this = this;
        this.attendees = new Array();
        this.keys = new Array();
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('events/' + this.eventKey + '/users').on('child_added', function (dataSnap) {
            _this.attendees.push(dataSnap.val());
            _this.keys.push(dataSnap.key);
        });
    };
    EventInfoPage.prototype.joinOrDeleteEvent = function () {
        var _this = this;
        if (this.buttonTxt == "Delete") {
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/events/' + this.eventKey).remove();
            var toast = this.toastCtrl.create({
                message: 'Event was removed successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__events_events__["a" /* EventsPage */]);
        }
        else if (this.buttonTxt == "Join") {
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/events/' + this.eventKey + '/users').push({
                userID: this.fAuth.auth.currentUser.uid
            });
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', function (dataSnap) {
                _this.userKey = dataSnap.key;
                _this.db.list('userProfiles/' + _this.userKey + '/events').push({
                    evnt: _this.eventKey
                });
            });
            var toast = this.toastCtrl.create({
                message: 'You joined this event successfully',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }
    };
    EventInfoPage.prototype.getUser = function () {
        var _this = this;
        this.databaseprovider.getDatabaseState().subscribe(function (rdy) {
            _this.user = new Array();
            if (rdy) {
                _this.databaseprovider.getUser(_this.userID).then(function (data) {
                    _this.user = data;
                    for (var i = 0; i < _this.user.length; i++) {
                        _this.firstName = _this.user[i].firstName;
                        _this.lastName = _this.user[i].lastName;
                    }
                });
            }
        });
    };
    EventInfoPage.prototype.clickProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */], {
            userID: this.userID
        });
    };
    EventInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-event-info',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/event-info/event-info.html"*/'\n<ion-header >\n  \n  <ion-title>{{title}}</ion-title>\n\n</ion-header>\n\n<ion-content >\n\n  <ion-card >\n    <ion-item>\n      <ion-avatar (click)="clickProfile()" item-start>\n        <img src="{{profilePic}}">\n      </ion-avatar>\n      <h2 (click)="clickProfile()">{{firstName}} {{lastName}}</h2>\n    </ion-item>\n      <img src="{{myPhotoURL}}"/>\n      <ion-item>\n        <ion-icon name=\'heart-outline\'></ion-icon>\n        Likes\n        <ion-badge item-end>9</ion-badge>\n      </ion-item>\n      <ion-card-content>\n     \n        <p>\n         <!-- {{start}}-{{end}} -->\n        </p>\n  \n        <p>\n         {{desc}}\n        </p>\n        <ion-item>\n            <ion-icon name=\'md-pin\' ></ion-icon>\n            {{location}}\n            </ion-item>\n            <ion-item (click)="viewAttendees()">\n          <ion-icon name=\'md-people\'></ion-icon>\n          People Attending\n          <ion-badge item-end>{{attendees.length}}</ion-badge>\n        </ion-item>\n        <ion-item>\n          <ion-icon name=\'md-paper-plane\'></ion-icon>\n          Share With Friends\n          \n        </ion-item>\n        <button (click)="joinOrDeleteEvent()" ion-button small color="secondary">{{buttonTxt}}</button>\n      </ion-card-content>\n      \n    </ion-card>\n\n\n</ion-content>'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/event-info/event-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__["a" /* AngularFireDatabase */]])
    ], EventInfoPage);
    return EventInfoPage;
}());

//# sourceMappingURL=event-info.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MychatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_chat__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the MychatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MychatsPage = (function () {
    function MychatsPage(navCtrl, navParams, databaseprovider, auth, fAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.databaseprovider = databaseprovider;
        this.auth = auth;
        this.fAuth = fAuth;
        this.myChats = new Array();
        this.eventIDs = new Array();
        this.events = new Array();
    }
    MychatsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MychatsPage');
    };
    MychatsPage.prototype.clickEvent = function (event, i) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__chat_chat__["a" /* ChatPage */], {
            username: this.fAuth.auth.currentUser.displayName,
            eventID: this.eventIDs[i]
        });
    };
    MychatsPage.prototype.ionViewWillEnter = function () {
        this.getEvents();
    };
    MychatsPage.prototype.getEvents = function () {
        // this.databaseprovider.getDatabaseState().subscribe(rdy => {
        //   this.myChats=new Array();
        //   if (rdy) {
        var _this = this;
        //       this.databaseprovider.getEveryEventForUser().then(data => {
        //           this.myChats = data;
        //         })
        //   }
        // })
        this.eventIDs = new Array();
        this.myChats = new Array();
        __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', function (dataSnap) {
            _this.userKey = dataSnap.key;
        }).then(function () {
            __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('userProfiles/' + _this.userKey + '/events').on('child_added', function (dataSnap) {
                _this.eventIDs.push(dataSnap.val().evnt);
                __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('events/').orderByKey().equalTo(dataSnap.val().evnt).on('child_added', function (dataSnap) {
                    _this.myChats.push(dataSnap.val());
                    //this.keys.push(dataSnap.key)
                });
            });
        });
    };
    MychatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mychats',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/mychats/mychats.html"*/'<!--\n  Generated template for the MychatsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>mychats</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card  *ngFor="let chat of myChats; let i= index"  >\n           \n    <ion-item (click)="clickEvent(event, i)"> \n     \n      \n      <h1>{{chat.eventName}}</h1>\n      \n      \n      \n      \n    </ion-item>\n\n    <!-- <img (click)="clickEvent(event, i)" src="http://placehold.it/500x200" /> -->\n    <ion-card-content (click)="clickEvent(event, i)">\n     \n        <!-- <p >\n          {{time[i].start}}-{{time[i].end}}\n        </p> -->\n  \n        <p>\n         {{chat.description}}\n        </p>\n        <ion-item>\n            <ion-icon name=\'md-pin\' ></ion-icon>\n            {{chat.location}}\n            </ion-item>\n      \n  \n      </ion-card-content>\n      <button  (click)="addEvent(event,i)" color="secondary" ion-button round outline item-end icon-left>\n          <ion-icon name="add"></ion-icon>\n          Leave\n        </button>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/mychats/mychats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MychatsPage);
    return MychatsPage;
}());

//# sourceMappingURL=mychats.js.map

/***/ }),

/***/ 228:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 228;

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-event/add-event.module": [
		887,
		10
	],
	"../pages/event-builder/event-builder.module": [
		888,
		9
	],
	"../pages/event-info/event-info.module": [
		889,
		8
	],
	"../pages/event-modal/event-modal.module": [
		890,
		5
	],
	"../pages/login/login.module": [
		891,
		4
	],
	"../pages/mychats/mychats.module": [
		892,
		7
	],
	"../pages/people-attending/people-attending.module": [
		893,
		3
	],
	"../pages/profile/profile.module": [
		894,
		6
	],
	"../pages/register/register.module": [
		895,
		2
	],
	"../pages/reset-password/reset-password.module": [
		896,
		1
	],
	"../pages/signup/signup.module": [
		897,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 272;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventCreateProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database_deprecated__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EventCreateProvider = (function () {
    function EventCreateProvider(db, http, fAuth) {
        this.db = db;
        this.http = http;
        this.fAuth = fAuth;
    }
    EventCreateProvider.prototype.createEvent = function (imageID, userID, eventName, description, location, eventStartDate, eventStartTime, eventEndDate, eventEndTime, eventLat, eventLng) {
        var _this = this;
        return Promise.resolve(this.db.list('events/')
            .push({ eventName: eventName,
            description: description,
            location: location,
            eventStartDate: eventStartDate,
            eventStartTime: eventStartTime,
            eventEndDate: eventEndDate,
            eventEndTime: eventEndTime,
            eventLat: eventLat,
            eventLng: eventLng,
            creatorID: userID,
            imageID: imageID
        })).then(function (evnt) {
            _this.db.list('events/' + evnt.key + '/users').push({
                userID: userID
            });
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(userID).once('child_added', function (dataSnap) {
                _this.userKey = dataSnap.key;
                _this.db.list('userProfiles/' + _this.userKey + '/events').push({
                    evnt: evnt.key
                });
            });
        });
        // console.log(eventName + description + location);
    };
    EventCreateProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], EventCreateProvider);
    return EventCreateProvider;
}());

//# sourceMappingURL=event-create.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_google_maps_cluster_google_maps_cluster__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_google_maps_google_maps__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(db, navCtrl, zone, geolocation, mapCluster, auth, databaseprovider, maps) {
        // databaseprovider.setUserID(this.auth.getUserInfo().userID);
        this.db = db;
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.geolocation = geolocation;
        this.mapCluster = mapCluster;
        this.auth = auth;
        this.databaseprovider = databaseprovider;
        this.maps = maps;
        this.locations = new Array();
        this.query = '';
        this.places = [];
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.loadMap();
        // firebase.database().ref('/events').on('child_added', (dataSnap) => {
        //   this.addMarker({lat:dataSnap.val().eventLat,lng:dataSnap.val().eventLng}, this.maps.map)
        //  });
    };
    HomePage.prototype.loadMap = function () {
        var _this = this;
        var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
            _this.autocompleteService = new google.maps.places.AutocompleteService();
            _this.placesService = new google.maps.places.PlacesService(_this.maps.map);
            _this.searchDisabled = false;
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
    };
    HomePage.prototype.selectPlace = function (place) {
        var _this = this;
        this.places = [];
        var location = {
            lat: null,
            lng: null,
            name: place.name
        };
        this.placesService.getDetails({ placeId: place.place_id }, function (details) {
            _this.zone.run(function () {
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                _this.saveDisabled = false;
                _this.maps.map.setCenter({ lat: location.lat, lng: location.lng });
                _this.location = location;
            });
        });
    };
    HomePage.prototype.searchPlace = function () {
        var _this = this;
        this.saveDisabled = true;
        if (this.query.length > 0 && !this.searchDisabled) {
            var config = {
                types: ['geocode'],
                input: this.query
            };
            this.autocompleteService.getPlacePredictions(config, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                    _this.places = [];
                    predictions.forEach(function (prediction) {
                        _this.places.push(prediction);
                    });
                }
            });
        }
        else {
            this.places = [];
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "pleaseConnect", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'home-page',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar >\n            <ion-title>Home</ion-title>\n    </ion-navbar>\n  \n    <ion-toolbar>\n        <ion-searchbar [(ngModel)]="query" (ionInput)="searchPlace()"></ion-searchbar>\n    </ion-toolbar>\n  \n    <ion-list>\n        <ion-item *ngFor="let place of places" (touchstart)="selectPlace(place)">{{place.description}}</ion-item>\n    </ion-list>\n  \n  </ion-header>\n  \n  <ion-content>\n  \n    <div #pleaseConnect id="please-connect">\n        <p>Please connect to the Internet...</p>\n    </div>\n  \n    <div #map id="map">\n        <ion-spinner></ion-spinner>\n    </div>\n  \n  </ion-content>'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_6__providers_google_maps_cluster_google_maps_cluster__["a" /* GoogleMapsClusterProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_google_maps_google_maps__["a" /* GoogleMaps1 */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsClusterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_js_marker_clusterer__ = __webpack_require__(863);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_js_marker_clusterer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_node_js_marker_clusterer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GoogleMapsClusterProvider = (function () {
    function GoogleMapsClusterProvider(http) {
        this.http = http;
        console.log('Hello GoogleMapsCluster Provider');
        this.locations = [
            { lat: -31.563910, lng: 147.154312 },
            { lat: -33.718234, lng: 150.363181 },
            { lat: -33.727111, lng: 150.371124 },
            { lat: -33.848588, lng: 151.209834 },
            { lat: -33.851702, lng: 151.216968 },
            { lat: -34.671264, lng: 150.863657 },
            { lat: -35.304724, lng: 148.662905 },
            { lat: -36.817685, lng: 175.699196 },
            { lat: -36.828611, lng: 175.790222 },
            { lat: -37.750000, lng: 145.116667 },
            { lat: -37.759859, lng: 145.128708 },
            { lat: -37.765015, lng: 145.133858 },
            { lat: -37.770104, lng: 145.143299 },
            { lat: -37.773700, lng: 145.145187 },
            { lat: -37.774785, lng: 145.137978 },
            { lat: -37.819616, lng: 144.968119 },
            { lat: -38.330766, lng: 144.695692 },
            { lat: -39.927193, lng: 175.053218 },
            { lat: -41.330162, lng: 174.865694 },
            { lat: -42.734358, lng: 147.439506 },
            { lat: -42.734358, lng: 147.501315 },
            { lat: -42.735258, lng: 147.438000 },
            { lat: -43.999792, lng: 170.463352 }
        ];
    }
    GoogleMapsClusterProvider.prototype.addCluster = function (map) {
        if (google.maps) {
            //Convert locations into array of markers
            var markers = this.locations.map(function (location) {
                return new google.maps.Marker({
                    position: location,
                    label: "Hello!"
                });
            });
            this.markerCluster = new __WEBPACK_IMPORTED_MODULE_2_node_js_marker_clusterer__(map, markers, { imagePath: 'assets/m' });
        }
        else {
            console.warn('Google maps needs to be loaded before adding a cluster');
        }
    };
    GoogleMapsClusterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], GoogleMapsClusterProvider);
    return GoogleMapsClusterProvider;
}());

//# sourceMappingURL=google-maps-cluster.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
* Generated class for the ChatPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
//@IonicPage()
var ChatPage = (function () {
    function ChatPage(db, navCtrl, navParams) {
        var _this = this;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.username = '';
        this.message = '';
        this.messages = [];
        this.username = this.navParams.get('username');
        this.eventID = this.navParams.get('eventID');
        this._chatSubscription = this.db.list('events/' + this.eventID + '/chat').subscribe(function (data) {
            _this.messages = data;
        });
    }
    ChatPage.prototype.sendMessage = function () {
        this.db.list('events/' + this.eventID + '/chat').push({
            username: this.username,
            message: this.message
        }).then(function () {
            // message is sent
        });
        this.message = '';
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        this.db.list('events/' + this.eventID + '/chat').push({
            specialMessage: true,
            message: this.username + " has joined the room"
        });
    };
    ChatPage.prototype.ionViewWillLeave = function () {
        this._chatSubscription.unsubscribe();
        this.db.list('events/' + this.eventID + '/chat').push({
            specialMessage: true,
            message: this.username + " has left the room"
        });
    };
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/chat/chat.html"*/'<!--\nGenerated template for the ChatPage page.\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\nIonic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Chat</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div id="chatMessages">\n    <div *ngFor="let message of messages" [class]="message.specialMessage ? \'message special\' : \'message\'">\n      <div [class]="message.username == username ? \'innerMessage messageRight\' : \'innerMessage messageLeft\'">\n        <div class="username">{{ message.username }}</div>\n        <div class="messageContent">{{ message.message }}</div>\n      </div>\n    </div>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <div id="footer">\n      <div class="elem"><ion-input type="text" [(ngModel)]="message"></ion-input></div>\n      <div class="elem"><button ion-button icon-only (click)="sendMessage()"><ion-icon name="send"></ion-icon> </button></div>\n    </div>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite_porter__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(373);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DatabaseProvider = (function () {
    function DatabaseProvider(sqlitePorter, storage, sqlite, platform, http) {
        var _this = this;
        this.sqlitePorter = sqlitePorter;
        this.storage = storage;
        this.sqlite = sqlite;
        this.platform = platform;
        this.http = http;
        this.databaseReady = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["BehaviorSubject"](false);
        this.platform.ready().then(function () {
            _this.sqlite.create({
                name: 'maxlife.db',
                location: 'default'
            })
                .then(function (db) {
                _this.database = db;
                _this.storage.get('database_filled').then(function (val) {
                    if (val) {
                        _this.databaseReady.next(true);
                    }
                    else {
                        _this.createTables();
                    }
                });
            });
        });
    }
    DatabaseProvider.prototype.setDate = function (date) { this.date = date; };
    DatabaseProvider.prototype.createTables = function () {
        // this.http.get('sampleSql.sql')
        //   .map(res => res.text())
        //   .subscribe(sql => {
        //     alert("hi");
        //     this.sqlitePorter.importSqlToDb(this.database, sql)
        //       .then(data => {
        //         this.databaseReady.next(true);
        //         this.storage.set('database_filled', true);
        //       })
        //       .catch(e => console.error(e));
        //   });
        this.databaseReady.next(true);
        this.database.executeSql("CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT,creatorID INTEGER,userID INTEGER,title TEXT,desc TEXT,location TEXT, start SMALLDATETIME, end SMALLDATETIME, length FLOAT,public TEXT)", function (err) {
            alert('Error: ');
            return err;
        });
        this.database.executeSql("CREATE TABLE IF NOT EXISTS users(userID INTEGER PRIMARY KEY AUTOINCREMENT,firstName TEXT,lastName TEXT,email TEXT, pass TEXT)", function (err) {
            alert('Error: ');
            alert(err);
            return err;
        });
        this.database.executeSql("CREATE TABLE IF NOT EXISTS friends(id INTEGER PRIMARY KEY AUTOINCREMENT,friend1 INTEGER,friend2 INTEGER,accept1 INTEGER,accept2 INTEGER)", function (err) {
            alert('Error: ');
            alert(err);
            return err;
        });
        this.database.executeSql("CREATE TABLE IF NOT EXISTS user_events(usereventid INTEGER PRIMARY KEY AUTOINCREMENT,eventID INTEGER,userID INTEGER)", function (err) {
            alert('Error: ');
            alert(err);
            return err;
        });
        this.database.executeSql("CREATE TABLE IF NOT EXISTS tasks(taskID INTEGER PRIMARY KEY AUTOINCREMENT,userID INTEGER,title TEXT, complete TEXT)", function (err) {
            alert('Error: ');
            alert(err);
            return err;
        });
        // let data = ["Get Groceries", "Go to the store and get groceries", "The store",new Date(),new Date(),new Date()];
        // this.database.executeSql("INSERT INTO events (title,desc,location,date, start, end) VALUES (?, ?, ?,?,?,?)", data)
        // , err => {
        //   console.log('Error: ', err);
        // };
        // this.database.executeSql("SELECT * FROM events", []).then((data) => {
        //   if (data.rows.length > 0) {
        //     for (var i = 0; i < data.rows.length; i++) {
        //       alert("tits"+ data.rows.item(i).title);
        //     }
        //   }
        // }, err => {
        //   console.log('Error: ', err);
        //   return [];
        // });
    };
    DatabaseProvider.prototype.getUserTasks = function () {
        return this.database.executeSql("SELECT * FROM tasks WHERE userID=? AND complete='No'", [this.userID]).then(function (data) {
            var developers = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    developers.push({ taskID: data.rows.item(i).taskID, userID: data.rows.item(i).userID, eventID: data.rows.item(i).id, title: data.rows.item(i).title });
                }
            }
            return developers;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.addTask = function (title) {
        var data = [this.userID, title, 'No'];
        return this.database.executeSql("INSERT INTO tasks (userID,title,complete) VALUES (?,?,?)", data).then(function (data) {
            return data;
        }, function (err) {
            console.log('Error: ', err);
            return err;
        });
    };
    DatabaseProvider.prototype.completeTask = function (taskID) {
        var data = [taskID];
        return this.database.executeSql("UPDATE tasks SET complete='Yes' WHERE taskID=?", data).then(function (data) {
            return data;
        }, function (err) {
            console.log('Error: ', err);
            return err;
        });
    };
    DatabaseProvider.prototype.findFriendshipStatus2 = function (user1, user2) {
        var _this = this;
        return this.database.executeSql("SELECT * FROM friends WHERE (friend1=? OR friend1=?) AND (friend2=? OR friend2=?) ", [user1, user2, user1, user2]).then(function (data) {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows.item(i).accept1 == 1 && data.rows.item(i).accept2 == 1) {
                        //you are friends
                        //alert("You are friends");
                        return "Friends";
                    }
                    else if (data.rows.item(i).friend1 == _this.userID && data.rows.item(i).accept1 == 1 && data.rows.item(i).accept2 == 0) {
                        //you requested
                        //alert("You requested ")
                        return "Cancel";
                    }
                    else if (data.rows.item(i).friend1 != _this.userID && data.rows.item(i).accept1 == 1 && data.rows.item(i).accept2 == 0) {
                        //they requested
                        //alert("They request")
                        return "Accept";
                    }
                }
            }
            else {
                if (user1 == user2) {
                    //alert("This is you");
                    return "You";
                }
                else {
                    //alert("No one has requested");
                    return "Add";
                }
            }
            return "";
        }, function (err) {
            alert(err);
            return "";
        });
    };
    DatabaseProvider.prototype.findFriendshipStatus = function (user1, user2) {
        var _this = this;
        return this.database.executeSql("SELECT * FROM friends WHERE (friend1=? OR friend1=?) AND (friend2=? OR friend2=?) ", [user1, user2, user1, user2]).then(function (data) {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows.item(i).accept1 == 1 && data.rows.item(i).accept2 == 1) {
                        //you are friends
                        //alert("You are friends");
                        return "Friends";
                    }
                    else if (data.rows.item(i).friend1 == _this.userID && data.rows.item(i).accept1 == 1 && data.rows.item(i).accept2 == 0) {
                        //you requested
                        //alert("You requested ")
                        return "Cancel Request";
                    }
                    else if (data.rows.item(i).friend1 != _this.userID && data.rows.item(i).accept1 == 1 && data.rows.item(i).accept2 == 0) {
                        //they requested
                        //alert("They request")
                        return "Accept Friend Request";
                    }
                }
            }
            else {
                if (user1 == user2) {
                    //alert("This is you");
                    return "Edit Profile";
                }
                else {
                    //alert("No one has requested");
                    return "Send Friend Request";
                }
            }
            return "";
        }, function (err) {
            alert(err);
            return "";
        });
    };
    DatabaseProvider.prototype.requestFriendship = function (f1, f2) {
        var data = [f1, f2, 1, 0];
        alert("Requsting friend to user " + f2);
        return this.database.executeSql("INSERT INTO friends (friend1,friend2,accept1,accept2) VALUES (?,?,?,?)", data).then(function (data) {
            return data;
        }, function (err) {
            console.log('Error: ', err);
            return err;
        });
    };
    DatabaseProvider.prototype.acceptFriendship = function (user) {
        var _this = this;
        var data = [this.userID, user];
        return this.database.executeSql("UPDATE friends SET accept2=1 WHERE friend2=? AND friend1=?", data).then(function (data) {
            alert("Creating a friendship between users " + _this.userID + " and " + user);
            return data;
        }, function (err) {
            console.log('Error: ', err);
            return err;
        });
    };
    DatabaseProvider.prototype.declineFriendship2 = function (user1, user2) {
        this.database.executeSql("DELETE FROM friends WHERE friend1=? AND friend2=?", [user2, user1]).then(function (data) {
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    DatabaseProvider.prototype.declineFriendship = function (entry) {
        this.database.executeSql("DELETE FROM friends WHERE id=?", [entry]).then(function (data) {
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    DatabaseProvider.prototype.getFriendRequests = function () {
        return this.database.executeSql("SELECT users.firstName,users.lastName,friends.id,friends.friend1 FROM users INNER JOIN friends ON friends.friend1=users.userID WHERE friends.friend2=? AND friends.accept1=1 AND friends.accept2=0 ", [this.userID]).then(function (data) {
            var users = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    users.push({ id: data.rows.item(i).id, user: data.rows.item(i).friend1, firstName: data.rows.item(i).firstName, lastName: data.rows.item(i).lastName });
                }
            }
            return users;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.getAllFromFriends = function () {
        this.database.executeSql("SELECT * FROM friends", []).then(function (data) {
            alert("hello");
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    alert(data.rows.item(i).friend1 + " " + data.rows.item(i).friend2 + " " + data.rows.item(i).accept1 + " " + data.rows.item(i).accept2);
                }
            }
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    DatabaseProvider.prototype.getFriends = function () {
        return this.database.executeSql("SELECT  users.firstName,users.lastName,friends.friend1, friends.friend2, CASE WHEN friends.friend1=? THEN friends.friend2 ELSE friends.friend1 END AS friend FROM friends,users WHERE users.userID=friend AND (friends.friend2=? OR friends.friend1=?) AND friends.accept1=1 AND friends.accept2=1 ", [this.userID, this.userID, this.userID]).then(function (data) {
            var users = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    users.push({ friend: data.rows.item(i).friend, firstName: data.rows.item(i).firstName, lastName: data.rows.item(i).lastName });
                }
            }
            return users;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.selectAllFromUserEvents = function () {
        var _this = this;
        return this.database.executeSql("SELECT * FROM user_events,events WHERE user_events.userID=? AND events.id=user_events.eventID ORDER BY events.start ASC ", [this.userID]).then(function (data) {
            var events = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    //  alert(this.date.getDay()+"/ "+this.date.getMonth()+"/"+this.date.getFullYear());
                    //alert(data.rows.item(i).start.getDay()+"/ "+data.rows.item(i).start.getMonth()+"/"+data.rows.item(i).start.getFullYear());
                    // alert(data.rows.item(i).start);
                    // alert(data.rows.item(i).start);
                    var compStart = _this.date.toISOString().slice(0, 10).replace('T', ' ');
                    var comp = data.rows.item(i).start.slice(0, 10).replace('T', ' ');
                    if (compStart == comp) {
                        events.push({ usereventID: data.rows.item(i).usereventid, creatorID: data.rows.item(i).creatorID, userID: data.rows.item(i).userID, eventID: data.rows.item(i).id, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location, start: data.rows.item(i).start, end: data.rows.item(i).end, length: data.rows.item(i).length, pub: data.rows.item(i).public });
                    }
                }
            }
            return events;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.getRecommendedEvents = function (start, end) {
        //get events within the time range that user is not attending
        return this.database.executeSql("SELECT *, sum(user_events.userID=?) AS times FROM events LEFT JOIN  user_events ON events.id=user_events.eventID WHERE events.public='Yes' GROUP BY events.id ORDER BY events.start ASC", [this.userID]).then(function (data) {
            var developers = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    var eventStart = new Date(data.rows.item(i).start);
                    var eventEnd = new Date(data.rows.item(i).end);
                    var times = data.rows.item(i).times;
                    if (eventStart >= start && eventEnd <= end && times == 0) {
                        developers.push({ eventID: data.rows.item(i).id, userID: data.rows.item(i).userID, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location, start: data.rows.item(i).start, end: data.rows.item(i).end, length: data.rows.item(i).length, pub: data.rows.item(i).public });
                    }
                }
            }
            return developers;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.getAttendees = function (eventid) {
        return this.database.executeSql("SELECT * FROM user_events,users WHERE user_events.eventID=? AND users.userID=user_events.userID ORDER BY users.lastName", [eventid]).then(function (data) {
            var attendees = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    attendees.push({ userID: data.rows.item(i).userID, firstName: data.rows.item(i).firstName, lastName: data.rows.item(i).lastName });
                }
            }
            return attendees;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.addUserToEvent = function (eventID, userID) {
        var _this = this;
        var data = [eventID, userID];
        alert("Adding user" + userID + " to event " + eventID);
        this.database.executeSql("INSERT INTO user_events(eventID,userID) VALUES (?,?)", data).then(function (data) {
            _this.database.executeSql("SELECT * FROM user_events,events WHERE user_events.userID=? AND events.id=user_events.eventID", [_this.userID]).then(function (data) {
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        alert("You are addded to event " + data.rows.item(i).title);
                    }
                }
            }, function (err) {
                alert("This is a addUser error " + err);
            });
        }, function (err) {
            alert("This is a addUser error " + err);
        });
    };
    DatabaseProvider.prototype.setUserID = function (id) {
        this.userID = id;
    };
    DatabaseProvider.prototype.addUser = function (firstName, lastName, email, pass) {
        var data = [firstName, lastName, email, pass];
        return this.database.executeSql("INSERT INTO users(firstName,lastName,email,pass) VALUES (?,?, ?, ?)", data).then(function (data) {
            return data;
        }, function (err) {
            alert("This is a addUser error " + err);
            return err;
        });
    };
    DatabaseProvider.prototype.addEvent = function (creatorID, userID, title, desc, location, start, end, hours, pub) {
        var data = [creatorID, userID, title, desc, location, start, end, hours, pub];
        return this.database.executeSql("INSERT INTO events (creatorID,userID,title,desc,location, start, end,length,public) VALUES (?,?,?, ?, ?,?,?,?,?)", data).then(function (data) {
            return data;
        }, function (err) {
            console.log('Error: ', err);
            return err;
        });
    };
    DatabaseProvider.prototype.removeUserFromEvent = function (usereventID) {
        alert("Removing userevent " + usereventID);
        this.database.executeSql("DELETE FROM user_events WHERE usereventid=?", [usereventID]).then(function (data) {
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    DatabaseProvider.prototype.removeEvent = function (eventID) {
        this.database.executeSql("DELETE FROM events WHERE id=?", [eventID]).then(function (data) {
        }, function (err) {
            console.log('Error: ', err);
        });
    };
    DatabaseProvider.prototype.getLastEventEntered = function () {
        alert("Hi");
        return this.database.executeSql("SELECT id FROM events WHERE userID=? ORDER BY id DESC LIMIT 1", [this.userID]).then(function (data) {
            var developers = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    alert(data.rows.item(i).id);
                    developers.push({ id: data.rows.item(i).id });
                }
            }
            return developers;
        }, function (err) {
            alert('Error: ');
            return [];
        });
    };
    DatabaseProvider.prototype.getEveryEventForUser = function () {
        return this.database.executeSql("SELECT * FROM user_events,events WHERE user_events.userID=? AND events.id=user_events.eventID", [this.userID]).then(function (data) {
            var events = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    events.push({ usereventID: data.rows.item(i).usereventid, creatorID: data.rows.item(i).creatorID, userID: data.rows.item(i).userID, eventID: data.rows.item(i).id, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location, start: data.rows.item(i).start, end: data.rows.item(i).end, length: data.rows.item(i).length, pub: data.rows.item(i).public });
                }
            }
            return events;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.getAllEvents = function () {
        // return this.database.executeSql("SELECT * FROM events WHERE userID=? ORDER BY start ASC", [this.userID]).then((data) => {
        //   let  developers = [];
        //   if (data.rows.length > 0) {
        //     for (var i = 0; i < data.rows.length; i++) {
        //     //  alert(this.date.getDay()+"/ "+this.date.getMonth()+"/"+this.date.getFullYear());
        //       //alert(data.rows.item(i).start.getDay()+"/ "+data.rows.item(i).start.getMonth()+"/"+data.rows.item(i).start.getFullYear());
        //      // alert(data.rows.item(i).start);
        //     // alert(data.rows.item(i).start);
        //     var compStart=this.date.toISOString().slice(0, 10).replace('T', ' ');
        //     var comp=data.rows.item(i).start.slice(0, 10).replace('T', ' ');
        var _this = this;
        //     if(compStart==comp)
        //     {
        //       developers.push({ userID:data.rows.item(i).userID,eventID:data.rows.item(i).id,title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length,pub:data.rows.item(i).public });
        //     }
        //     }
        //   }
        //   return developers;
        // }, err => {
        //   console.log('Error: ', err);
        //   return [];
        // });
        return this.database.executeSql("SELECT * FROM events WHERE userID=? ORDER BY start ASC", [this.userID]).then(function (data) {
            var developers = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    //  alert(this.date.getDay()+"/ "+this.date.getMonth()+"/"+this.date.getFullYear());
                    //alert(data.rows.item(i).start.getDay()+"/ "+data.rows.item(i).start.getMonth()+"/"+data.rows.item(i).start.getFullYear());
                    // alert(data.rows.item(i).start);
                    // alert(data.rows.item(i).start);
                    var compStart = _this.date.toISOString().slice(0, 10).replace('T', ' ');
                    var comp = data.rows.item(i).start.slice(0, 10).replace('T', ' ');
                    if (compStart == comp) {
                        developers.push({ creatorID: data.rows.item(i).creatorID, userID: data.rows.item(i).userID, eventID: data.rows.item(i).id, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location, start: data.rows.item(i).start, end: data.rows.item(i).end, length: data.rows.item(i).length, pub: data.rows.item(i).public });
                    }
                }
            }
            return developers;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.getUser = function (userID) {
        return this.database.executeSql("SELECT * FROM users WHERE userID=? ", [userID]).then(function (data) {
            var user = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    user.push({ userID: data.rows.item(i).firstName, firstName: data.rows.item(i).firstName, lastName: data.rows.item(i).lastName });
                }
            }
            return user;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.getAllPublicEvents = function (date) {
        return this.database.executeSql("SELECT * FROM events WHERE public='Yes' ORDER BY start ASC", []).then(function (data) {
            var developers = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    //  alert(this.date.getDay()+"/ "+this.date.getMonth()+"/"+this.date.getFullYear());
                    //alert(data.rows.item(i).start.getDay()+"/ "+data.rows.item(i).start.getMonth()+"/"+data.rows.item(i).start.getFullYear());
                    // alert(data.rows.item(i).start);
                    // alert(data.rows.item(i).start);
                    var compStart = date.toISOString().slice(0, 10).replace('T', ' ');
                    var comp = data.rows.item(i).start.slice(0, 10).replace('T', ' ');
                    var now = new Date();
                    var eventStart = new Date(data.rows.item(i).start);
                    if (now < eventStart && compStart == comp) {
                        //get events after current date only
                        developers.push({ eventID: data.rows.item(i).id, userID: data.rows.item(i).userID, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location, start: data.rows.item(i).start, end: data.rows.item(i).end, length: data.rows.item(i).length, pub: data.rows.item(i).public });
                    }
                }
            }
            return developers;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.getEvents = function () {
        return this.database.executeSql("SELECT * FROM events ORDER BY start ASC", []).then(function (data) {
            var developers = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    developers.push({ eventID: data.rows.item(i).id, userID: data.rows.item(i).userID, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location, start: data.rows.item(i).start, end: data.rows.item(i).end, length: data.rows.item(i).length });
                }
            }
            return developers;
        }, function (err) {
            console.log('Error: ', err);
            return [];
        });
    };
    DatabaseProvider.prototype.getDatabaseState = function () {
        return this.databaseReady.asObservable();
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite_porter__["a" /* SQLitePorter */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mychats_mychats__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events_events__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__events_events__["a" /* EventsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__mychats_mychats__["a" /* MychatsPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Events" tabIcon="md-calendar"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="My Chats" tabIcon="md-chatboxes"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__location_select_location_select__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database_deprecated__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_google_maps_google_maps__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//import {HomePage} from '../home/home';
/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddEventPage = (function () {
    function AddEventPage(db, maps, navCtrl, navParams, viewController, databaseprovider, toastCtrl, modalCtrl) {
        this.db = db;
        this.maps = maps;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewController = viewController;
        this.databaseprovider = databaseprovider;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.event = {};
        this.events = new Array();
        this.allevents = new Array();
        this.add = true;
        this.startDate = new Date().toISOString();
        this.endDate = new Date().toISOString();
        var m = new Date(this.startDate);
        m.setDate(m.getDate() + 3650);
        this.max = m.toISOString();
        this.userID = navParams.get('userID');
    }
    AddEventPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddEventPage');
    };
    AddEventPage.prototype.closeModal = function () {
        this.viewController.dismiss();
    };
    AddEventPage.prototype.setUserID = function (id) {
        this.userID = id;
    };
    AddEventPage.prototype.addEvent = function () {
        // this.event=new EventProvider("Hello",1,1,"An event",this.date);
        var _this = this;
        // alert(this.event.date);
        //this.databaseprovider.addEvent(this.developer['name'], this.developer['skill'], parseInt(this.developer['yearsOfExperience']))
        var eventStartTime = new Date(this.startDate);
        var eventEndTime = new Date(this.endDate);
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        var hours = duration / (60 * 60 * 1000);
        var start = eventStartTime.toISOString().slice(0, 16).replace('T', ' ');
        var end = eventEndTime.toISOString().slice(0, 16).replace('T', ' ');
        var add = true;
        this.start = start;
        this.end = end;
        var theeventID = new Array();
        if (this.add == true) {
            this.db.list('/events').push({
                title: this.title,
                desc: this.desc,
                location: this.location,
                start: start,
                end: end,
                userID: this.userID,
                creatorID: this.userID
            }).then(function () {
                // message is sent
            });
            this.databaseprovider.addEvent(this.userID, this.userID, this.title, this.desc, this.location, start, end, hours, this.pub)
                .then(function (data) {
                //get last event id entered
                //then add user to that event
                _this.databaseprovider.getLastEventEntered()
                    .then(function (data) {
                    theeventID = data;
                    var id;
                    for (var i = 0; i < theeventID.length; i++) {
                        id = theeventID[i].id;
                    }
                    //get last event id entered
                    //then add user to that event
                    //hello
                    _this.databaseprovider.addUserToEvent(id, _this.userID);
                    _this.loadEventData();
                    _this.closeModal();
                });
            });
            this.event = {};
            // this.home.loadEventData();
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'Unable to add, you already have an event at this time.',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }
    };
    AddEventPage.prototype.loadEventData = function () {
        var _this = this;
        this.databaseprovider.selectAllFromUserEvents().then(function (data) {
            _this.events = data;
        });
    };
    AddEventPage.prototype.changeStart = function (ionicButton) {
        var _this = this;
        var end = new Date(this.startDate);
        end.setTime(end.getTime() + 60 * 60000);
        this.endDate = end.toISOString();
        var eventStartTime = new Date(this.startDate);
        eventStartTime.setHours(eventStartTime.getHours() + 6);
        var eventEndTime = new Date(this.endDate);
        eventEndTime.setHours(eventEndTime.getHours() + 6);
        this.add = true;
        this.databaseprovider.getEveryEventForUser().then(function (data) {
            _this.allevents = data;
            for (var i = 0; i < _this.allevents.length; i++) {
                var start = new Date(_this.allevents[i].start);
                var end = new Date(_this.allevents[i].end);
                if ((eventStartTime >= start && eventStartTime <= end) || (eventEndTime >= start && eventEndTime <= end)) {
                    _this.add = false;
                }
            }
            if (_this.add == true) {
                //set add button to green
                ionicButton.color = 'secondary';
            }
            else {
                //set add button to red
                ionicButton.color = 'danger';
            }
        });
    };
    AddEventPage.prototype.launchLocationPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__location_select_location_select__["a" /* LocationSelectPage */]);
        modal.onDidDismiss(function (location) {
            _this.location = location.name;
            var myLatLng = { lat: location.lat, lng: location.lng };
            _this.db.list('/locations').push({
                lat: location.lat,
                lng: location.lng
            }).then(function () {
                // message is sent
            });
            _this;
        });
        modal.present();
    };
    AddEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-event',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/add-event/add-event.html"*/'<!--\n  Generated template for the AddEventPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add Event</ion-title>\n    <button ion-button clear (click) = "closeModal()">Close</button>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label color="primary">Title</ion-label>\n      <ion-input [(ngModel)]="title" placeholder="Title"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary">Description</ion-label>\n      <ion-input [(ngModel)]="desc" placeholder="Description"></ion-input>\n    </ion-item>\n    <ion-item (click)="launchLocationPage()">\n      <ion-label color="primary">Location</ion-label>\n      <ion-input [(ngModel)]="location" placeholder="Location"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary">Start Date</ion-label>\n      <ion-datetime (ionChange)="changeStart(btn)" [max]="max" displayFormat="DD-MM-YYYY HH:mm" [min]="startDate" [(ngModel)]="startDate"></ion-datetime>\n    </ion-item>\n \n  \n    <ion-item>\n      <ion-label color="primary">End Date</ion-label>\n        <ion-datetime displayFormat="DD-MM-YYYY HH:mm" [max]="max" [min]="startDate" [(ngModel)]="endDate"></ion-datetime>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="primary">Outdoor Event?</ion-label>\n         <ion-toggle [(ngModel)] = "outside" ></ion-toggle>\n      </ion-item>\n\n      \n  </ion-list>\n\n\n  <button ion-button full #btn (click)="addEvent()">Add</button>\n</ion-content>\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/add-event/add-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__providers_google_maps_google_maps__["a" /* GoogleMaps1 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], AddEventPage);
    return AddEventPage;
}());

//# sourceMappingURL=add-event.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(http) {
        this.http = http;
        console.log('Hello AuthProvider Provider');
    }
    AuthProvider.prototype.loginUser = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    AuthProvider.prototype.signupUser = function (firstName, lastName, email, password) {
        return __WEBPACK_IMPORTED_MODULE_2_firebase___default.a
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (newUser) {
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a
                .database()
                .ref('/userProfile')
                .child(newUser.uid)
                .set({ email: email,
                firstName: firstName,
                lastName: lastName });
        });
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.logoutUser = function () {
        return __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().signOut();
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailProvider; });
var EmailProvider = (function () {
    function EmailProvider() {
    }
    EmailProvider.isValid = function (control) {
        var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            .test(control.value);
        if (re) {
            return null;
        }
        return {
            "invalidEmail": true
        };
    };
    return EmailProvider;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(477);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_location_select_location_select__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_auth_service_auth_service__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_sqlite_porter__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_sqlite__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__directives_parallax_parallax__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_events_events__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_add_event_add_event__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_mychats_mychats__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_event_info_event_info__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angularfire2_database_deprecated__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angularfire2__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_angularfire2_auth__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_chat_chat__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_connectivity_service_connectivity_service__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_google_maps_google_maps__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_network__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_google_maps_cluster_google_maps_cluster__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_google_maps2_google_maps2__ = __webpack_require__(885);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_event_create_event_create__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_event_builder_event_builder__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_auth_auth__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_email_email__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_camera__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_facebook__ = __webpack_require__(886);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







































// Michael's Database
// var config = {
//   apiKey: "AIzaSyCTJT08mbl9Vpp7x2G0WSrQpjf-0sRTEbY",
//   authDomain: "chat-c50e8.firebaseapp.com",
//   databaseURL: "https://chat-c50e8.firebaseio.com",
//   projectId: "chat-c50e8",
//   storageBucket: "chat-c50e8.appspot.com",
//   messagingSenderId: "101050978336"
// };
// Liam's Database
var config = {
    apiKey: "AIzaSyCNATg5Q8TZqnxW3PhaqdMNfan9zobQMTs",
    authDomain: "coms-309.firebaseapp.com",
    databaseURL: "https://coms-309.firebaseio.com",
    projectId: "coms-309",
    storageBucket: "coms-309.appspot.com",
    messagingSenderId: "769505137443"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_19__directives_parallax_parallax__["a" /* ParallaxHeaderDirective */],
                __WEBPACK_IMPORTED_MODULE_20__pages_events_events__["a" /* EventsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_mychats_mychats__["a" /* MychatsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_event_info_event_info__["a" /* EventInfoPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_location_select_location_select__["a" /* LocationSelectPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_event_builder_event_builder__["a" /* EventBuilderPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/add-event/add-event.module#AddEventPageModule', name: 'AddEventPage', segment: 'add-event', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-builder/event-builder.module#EventBuilderPageModule', name: 'EventBuilderPage', segment: 'event-builder', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-info/event-info.module#EventInfoPageModule', name: 'EventInfoPage', segment: 'event-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-modal/event-modal.module#EventModalPageModule', name: 'EventModalPage', segment: 'event-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mychats/mychats.module#MychatsPageModule', name: 'MychatsPage', segment: 'mychats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/people-attending/people-attending.module#PeopleAttendingPageModule', name: 'PeopleAttendingPage', segment: 'people-attending', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordPageModule', name: 'ResetPasswordPage', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_25_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_24_angularfire2_database_deprecated__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_26_angularfire2_auth__["b" /* AngularFireAuthModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_events_events__["a" /* EventsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_mychats_mychats__["a" /* MychatsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_event_info_event_info__["a" /* EventInfoPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_location_select_location_select__["a" /* LocationSelectPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_event_builder_event_builder__["a" /* EventBuilderPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_auth_service_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_13__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_sqlite_porter__["a" /* SQLitePorter */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_28__providers_connectivity_service_connectivity_service__["a" /* ConnectivityServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_29__providers_google_maps_google_maps__["a" /* GoogleMaps1 */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_31__providers_google_maps_cluster_google_maps_cluster__["a" /* GoogleMapsClusterProvider */],
                __WEBPACK_IMPORTED_MODULE_32__providers_google_maps2_google_maps2__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_33__providers_event_create_event_create__["a" /* EventCreateProvider */],
                __WEBPACK_IMPORTED_MODULE_35__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_36__providers_email_email__["a" /* EmailProvider */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_facebook__["a" /* Facebook */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(467);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = 'LoginPage';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/liamjameson/Desktop/YT_3/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/liamjameson/Desktop/YT_3/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParallaxHeaderDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ParallaxHeaderDirective = (function () {
    function ParallaxHeaderDirective(el, re) {
        this.el = el;
        this.re = re;
    }
    ParallaxHeaderDirective.prototype.ngOnInit = function () {
        var cnt = this.el.nativeElement.getElementsByClassName('scroll-content')[0];
        this.header = cnt.getElementsByClassName('bg')[0];
        this.main_cnt = cnt.getElementsByClassName('main-cnt')[0];
        this.re.setElementStyle(this.header, 'webTransformOrigin', 'center bottom');
        this.re.setElementStyle(this.header, 'background-size', 'cover');
        this.re.setElementStyle(this.main_cnt, 'position', 'absolute');
    };
    ParallaxHeaderDirective.prototype.onCntscroll = function (ev) {
        var _this = this;
        ev.domWrite(function () {
            _this.update(ev);
        });
    };
    ParallaxHeaderDirective.prototype.update = function (ev) {
        if (ev.scrollTop > 0) {
            this.ta = ev.scrollTop / 2;
        }
        this.re.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.ta + 'px,0) scale(1,1)');
    };
    ParallaxHeaderDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[parallax]',
            host: {
                '(ionScroll)': 'onCntscroll($event)',
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
    ], ParallaxHeaderDirective);
    return ParallaxHeaderDirective;
}());

//# sourceMappingURL=parallax.js.map

/***/ }),

/***/ 885:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMaps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_connectivity_service_connectivity_service__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoogleMaps = (function () {
    function GoogleMaps(connectivityService, geolocation) {
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.mapInitialised = false;
        this.apiKey = "AIzaSyBOzEUuY8CtG_Iq61bLQj6wVCcePsO_mn0";
    }
    GoogleMaps.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function (map) {
                            resolve(map);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit&libraries=places';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMaps.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            _this.geolocation.getCurrentPosition().then(function (position) {
                //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var latLng = new google.maps.LatLng(-31.563910, 147.154312);
                var mapOptions = {
                    center: latLng,
                    zoom: 2,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement, mapOptions);
                resolve(_this.map);
            });
        });
    };
    GoogleMaps.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMaps.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMaps.prototype.addConnectivityListeners = function () {
        var _this = this;
        this.connectivityService.watchOnline().subscribe(function () {
            console.log("online");
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        });
        this.connectivityService.watchOffline().subscribe(function () {
            console.log("offline");
            _this.disableMap();
        });
    };
    GoogleMaps = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_connectivity_service_connectivity_service__["a" /* ConnectivityServiceProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], GoogleMaps);
    return GoogleMaps;
}());

//# sourceMappingURL=google-maps2.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var User = (function () {
    function User(userID, name, lastname, email) {
        this.firstname = name;
        this.email = email;
        this.lastname = lastname;
        this.userID = userID;
    }
    return User;
}());

var AuthService = (function () {
    function AuthService(db, databaseprovider, fAuth) {
        this.db = db;
        this.databaseprovider = databaseprovider;
        this.fAuth = fAuth;
        this.database = databaseprovider;
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email === '' || credentials.password === '') {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                // At this point make a request to your backend to make a real check!
                var r = _this.fAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
                if (r) {
                    alert("Successfully logged in!");
                    observer.next(true);
                    observer.complete();
                }
                //let access = this.database.loginUser(credentials.email,credentials.password);
                // this.database.database.executeSql("SELECT * FROM users WHERE email=? AND pass=?", [credentials.email,credentials.password]).then((data) => {
                //   var login=false;
                //   if (data.rows.length > 0) {
                //     for (var i = 0; i < data.rows.length; i++) {
                //     // if(compStart==comp)
                //     // {
                //     //   developers.push({ title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length,pub:data.rows.item(i).public });
                //     // }
                //     var firstName=data.rows.item(i).firstName;
                //     var lastName=data.rows.item(i).lastName;
                //     var userID=data.rows.item(i).userID;
                //       if(data.rows.item(i).pass==credentials.password){
                //           login=true;
                //       }
                //       observer.next(login);
                //       observer.complete();
                //       
                //     }
                //   }
                // }, err => {
                //   alert( "Login error"+err);
                // });
            });
        }
    };
    AuthService.prototype.register = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            // At this point store the credentials to your backend!
            var r = this.fAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(function (newUser) {
                newUser.updateProfile({ displayName: credentials.first + " " + credentials.last });
                _this.db.list('/userProfiles').push({
                    userID: newUser.uid,
                    first: credentials.first,
                    last: credentials.last,
                    email: credentials.email
                });
            });
            if (r) {
                alert("Successfully registered!");
                // navCtrl.setRoot('LoginPage');
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                    observer.next(true);
                    observer.complete();
                });
            }
            // this.database.addUser(credentials.first, credentials.last,credentials.email,credentials.password);
        }
    };
    AuthService.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth-service.js.map

/***/ })

},[472]);
//# sourceMappingURL=main.js.map