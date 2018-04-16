webpackJsonp([5],{

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventModalPageModule", function() { return EventModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_modal__ = __webpack_require__(896);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventModalPageModule = (function () {
    function EventModalPageModule() {
    }
    EventModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_modal__["a" /* EventModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_modal__["a" /* EventModalPage */]),
            ],
        })
    ], EventModalPageModule);
    return EventModalPageModule;
}());

//# sourceMappingURL=event-modal.module.js.map

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(43);
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



/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventModalPage = (function () {
    function EventModalPage(navCtrl, navParams, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
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
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.creatorID).once('child_added', function (dataSnap) {
            _this.firstName = dataSnap.val().first;
            _this.lastName = dataSnap.val().last;
            _this.profilePic = dataSnap.val().photo;
        });
        //  if(this.creatorID==this.fAuth.auth.currentUser.uid){
        //      this.buttonTxt="Delete"
        //  }else{this.buttonTxt="Join"}
    }
    EventModalPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    EventModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventModalPage');
    };
    EventModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-event-modal',template:/*ion-inline-start:"/Users/michaelarnold/309project/src/pages/event-modal/event-modal.html"*/'<!--\n  Generated template for the EventModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <ion-title>{{title}}</ion-title>\n      <ion-buttons end>\n      <button ion-button (click)="closeModal()">Close</button>\n      </ion-buttons>\n  </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content >\n\n    <ion-card >\n      <ion-item>\n        <ion-avatar (click)="clickProfile()" item-start>\n          <img src="{{profilePic}}">\n        </ion-avatar>\n        <h2 (click)="clickProfile()">{{firstName}} {{lastName}}</h2>\n      </ion-item>\n        <img src="{{myPhotoURL}}"/>\n        <ion-item>\n          <ion-icon name=\'heart-outline\'></ion-icon>\n          Likes\n          <ion-badge item-end>9</ion-badge>\n        </ion-item>\n        <ion-card-content>\n       \n          <p>\n           <!-- {{start}}-{{end}} -->\n          </p>\n    \n          <p>\n           {{desc}}\n          </p>\n          <ion-item>\n              <ion-icon name=\'md-pin\' ></ion-icon>\n              {{location}}\n              </ion-item>\n              <ion-item (click)="viewAttendees()">\n            <ion-icon name=\'md-people\'></ion-icon>\n            People Attending\n            <ion-badge item-end>{{attendees.length}}</ion-badge>\n          </ion-item>\n          <ion-item>\n            <ion-icon name=\'md-paper-plane\'></ion-icon>\n            Share With Friends\n            \n          </ion-item>\n          <button (click)="joinOrDeleteEvent()" ion-button small color="secondary">{{buttonTxt}}</button>\n        </ion-card-content>\n        \n      </ion-card>\n  \n  \n  </ion-content>\n'/*ion-inline-end:"/Users/michaelarnold/309project/src/pages/event-modal/event-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], EventModalPage);
    return EventModalPage;
}());

//# sourceMappingURL=event-modal.js.map

/***/ })

});
//# sourceMappingURL=5.js.map