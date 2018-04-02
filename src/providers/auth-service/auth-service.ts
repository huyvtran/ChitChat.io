
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider } from './../../providers/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
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
 
@Injectable()
export class AuthService{
  currentUser: User;
  database:DatabaseProvider;
  constructor( public db: AngularFireDatabase,private databaseprovider: DatabaseProvider, 
    public fAuth: AngularFireAuth, ) {
    
    this.database=databaseprovider;
  }
  public login(credentials) {
    if (credentials.email === ''|| credentials.password === '') {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        var r = this.fAuth.auth.signInWithEmailAndPassword(
          credentials.email,
          credentials.password
        );
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
  }

    public fbLogin(User) {
      this.currentUser = User;
    }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      var r = this.fAuth.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password,

      ).then(newUser => {
        newUser.updateProfile({displayName:credentials.first+" "+credentials.last});
         this.db.list('/userProfiles').push({
         userID:newUser.uid,
         first:credentials.first,
         last:credentials.last,
        email:credentials.email
         })


      }
   
      
      );
      if (r) {
        alert("Successfully registered!");
       // navCtrl.setRoot('LoginPage');
       return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
      }
     // this.database.addUser(credentials.first, credentials.last,credentials.email,credentials.password);
    
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
