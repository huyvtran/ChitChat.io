webpackJsonp([3],{

/***/ 890:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeopleAttendingPageModule", function() { return PeopleAttendingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__people_attending__ = __webpack_require__(897);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PeopleAttendingPageModule = (function () {
    function PeopleAttendingPageModule() {
    }
    PeopleAttendingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__people_attending__["a" /* PeopleAttendingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__people_attending__["a" /* PeopleAttendingPage */]),
            ],
        })
    ], PeopleAttendingPageModule);
    return PeopleAttendingPageModule;
}());

//# sourceMappingURL=people-attending.module.js.map

/***/ }),

/***/ 897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeopleAttendingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(43);
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






/**
 * Generated class for the PeopleAttendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PeopleAttendingPage = (function () {
    function PeopleAttendingPage(navCtrl, navParams, viewController, databaseprovider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewController = viewController;
        this.databaseprovider = databaseprovider;
        this.attendeesIDs = new Array();
        this.attendees = new Array();
        this.attendeesIDs = navParams.get('attendees');
        for (var i = 0; i < this.attendeesIDs.length; i++) {
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('userProfiles/').orderByChild('userID').equalTo(this.attendeesIDs[i].userID).on('child_added', function (dataSnap) {
                _this.attendees.push(dataSnap.val());
                //this.keys.push(dataSnap.key)
            });
        }
    }
    PeopleAttendingPage.prototype.ionViewDidLoad = function () {
    };
    PeopleAttendingPage.prototype.clickPerson = function (a, i) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */], {
            userID: a.userID
        });
    };
    PeopleAttendingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-people-attending',template:/*ion-inline-start:"/Users/michaelarnold/309project/src/pages/people-attending/people-attending.html"*/'<!--\n  Generated template for the PeopleAttendingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n<ion-content padding>\n    \n  <ion-card (click)="clickPerson(a, i)" *ngFor="let a of attendees; let i= index"  >\n     \n\n      <ion-card-content >\n       \n         \n      <ion-item> \n        <ion-avatar  item-start>\n          <img src="{{a.photo}}">\n        </ion-avatar>\n        <h2 >{{a.first}} {{a.last}}</h2>\n      </ion-item>\n             \n           \n              \n            \n    \n        </ion-card-content>\n\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/michaelarnold/309project/src/pages/people-attending/people-attending.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], PeopleAttendingPage);
    return PeopleAttendingPage;
}());

//# sourceMappingURL=people-attending.js.map

/***/ })

});
//# sourceMappingURL=3.js.map