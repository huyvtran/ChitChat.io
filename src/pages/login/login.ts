
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
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
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private afAuth: AngularFireAuth) {
   // Goes in consturctor --> , private fb: Facebook
    // fb.getLoginStatus()
    // .then(res => {
    //   console.log(res.status);
    //   if(res.status === "connect") {
    //     this.isLoggedIn = true;
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // })
    // .catch(e => console.log(e));
   }

  //  fbLogin() {
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //     .then(res => {
  //       if(res.status === "connected") {
  //         this.isLoggedIn = true;
  //         this.getUserDetail(res.authResponse.userID);
  //       } else {
  //         this.isLoggedIn = false;
  //       }
  //     })
  //     .catch(e => console.log('Error logging into Facebook', e));
  // }

  //   fbLogout() {
  //     this.fb.logout()
  //       .then( res => this.isLoggedIn = false)
  //       .catch(e => console.log('Error logout from Facebook', e));
  //   }

  //   getUserDetail(userid) {
  //     this.fb.api("/"+userid+"/?fields=id,email,name,picture",["public_profile"])
  //       .then(res => {
  //         console.log(res);
  //         this.users = res;
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //   }
   
  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((res) => console.log(res));
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

