import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Time } from '@angular/common';



@Injectable()
export class EventCreateProvider {

  constructor(public http: Http) {
    console.log('Hello EventProvider Provider');
  }

   createEvent(eventName: string, description: Text, location: Location, eventStartDate: Date, eventStartTime: Time, eventEndDate: Date, eventEndTime: Time): Promise<any> {

     return Promise.resolve(firebase
        .database()
        .ref('/events')
        .push({ eventName: eventName, 
          description: description,
          location: location,
          eventStartDate: eventStartDate,
          eventStartTime: eventStartTime,
          eventEndDate: eventEndDate,
          eventEndTime: eventEndTime,
        }));
       // console.log(eventName + description + location);
    }
  }