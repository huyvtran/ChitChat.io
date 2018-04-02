
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, Platform,  Loading, IonicPage } from 'ionic-angular';
import { AuthService } from './../../providers/auth-service/auth-service';
import { TabsPage } from '../../pages/tabs/tabs';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from "angularfire2/database-deprecated";
export class User {
  firstname: string;
  email: string;
  lastname:string;
  userID:Number;
  constructor(userID:Number,name: string,lastname:string, email: string) {
    this.firstname = name;
    this.email = email;
    this.lastname=lastname;
    this.userID=userID;
  }
}



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  isLoggedIn:boolean = false;
  userData: any;

 
  constructor(
    private nav: NavController,
     private auth: AuthService,
      private alertCtrl: AlertController,
       private loadingCtrl: LoadingController,
        private afAuth: AngularFireAuth,
          private toastCtrl: ToastController,
            private facebook: Facebook,
              private platform: Platform,
                 public db: AngularFireDatabase) {
  
   }
   
  loginFacebook() {
    // if (this.platform.is('cordova')) {
    //   return this.facebook.login(['email', 'public_profile']).then(res => {
    //     const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    //     return firebase.auth().signInWithCredential(facebookCredential);
    //   })
    // }
    // else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
         // console.log(res);
          //console.log(res.additionalUserInfo.profile.first_name.toString());
          if(res.additionalUserInfo.isNewUser == true){
            this.db.list('/userProfiles').push({
              userID:res.additionalUserInfo.profile.id,
              first:res.additionalUserInfo.profile.first_name,
              last:res.additionalUserInfo.profile.last_name,
              email:res.additionalUserInfo.profile.email
            });
            this.nav.setRoot(TabsPage);
          }
          else{
            var userLogin = new User(0,"","","");
            var fbdata = res;
            userLogin.firstname = fbdata.additionalUserInfo.profile.first_name.toString();
            userLogin.lastname = fbdata.additionalUserInfo.profile.last_name.toString();
            userLogin.userID = fbdata.additionalUserInfo.profile.id;
            userLogin.email = fbdata.additionalUserInfo.profile.email.toString();
            this.auth.fbLogin(userLogin);
            this.nav.setRoot(TabsPage);
            //console.log("--------");
            //console.log(userLogin);
          }
        });

    //     this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
    //   this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
    //     this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
    //   });
    // });
  

    // }

  }


  public createAccount() {
    this.nav.push('RegisterPage');
  }
 
  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {   
           
        this.nav.setRoot(TabsPage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    
  }
}

