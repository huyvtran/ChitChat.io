import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Time } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';


@Injectable()
export class EventCreateProvider {
userID
userKey
  constructor(public db: AngularFireDatabase,public http: Http,public fAuth: AngularFireAuth) {
  
  }

   createEvent(imageID,userID,eventName: string, description: Text, location: Location, eventStartDate: Date, eventStartTime: Time, eventEndDate: Date, eventEndTime: Time, eventLat, eventLng,pub): Promise<any> {
    
     return Promise.resolve(

         this.db.list('events/')
        .push({ eventName: eventName, 
          description: description,
          location: location,
          eventStartDate: eventStartDate,
          eventStartTime: eventStartTime,
          eventEndDate: eventEndDate,
          eventEndTime: eventEndTime,
          eventLat:eventLat,
          eventLng:eventLng,
          creatorID:userID,
          imageID:imageID,
          public:pub
        
        
        })).then((evnt)=>{
         
          this.db.list('events/'+evnt.key+'/users').push({
            userID:userID
          })
          firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(userID).once('child_added', (dataSnap) => {
    
            this.userKey=dataSnap.key
            this.db.list('userProfiles/'+this.userKey+'/events').push({
              evnt:evnt.key
            })
          });
         
        })
       // console.log(eventName + description + location);
    }
  }