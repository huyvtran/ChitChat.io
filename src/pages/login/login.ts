
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, Platform,  Loading, IonicPage } from 'ionic-angular';
import { AuthService } from './../../providers/auth-service/auth-service';
import { TabsPage } from '../../pages/tabs/tabs';
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  isLoggedIn:boolean = false;
  users: any;
 
  constructor(
    private nav: NavController,
     private auth: AuthService,
      private alertCtrl: AlertController,
       private loadingCtrl: LoadingController,
        private afAuth: AngularFireAuth,
          private toastCtrl: ToastController,
            private facebook: Facebook,
              private platform: Platform) {
  
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
          console.log(res);
          this.nav.setRoot(TabsPage);
        });
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

