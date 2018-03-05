import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailProvider } from '../../providers/email/email';
import { LoginPage } from '../../pages/login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController, 
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
      this.signupForm = formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['', 
          Validators.compose([Validators.required, EmailProvider.isValid])],
        password: ['', 
          Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

    signupUser(){
      if (!this.signupForm.valid){
        console.log(this.signupForm.value);
      } else {
        // this.authProvider.signupUser(this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.email, 
        //   this.signupForm.value.password)
        firebase.auth().createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        alert(errorMessage)
          // ...
        })
        .then(() => {
   
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(LoginPage);
          });
        }, (error) => {
        alert("There is an error")
        });
       
      }
    }
}
