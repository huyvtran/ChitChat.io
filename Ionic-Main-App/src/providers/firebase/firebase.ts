import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,} from 'angularfire2/database-deprecated';
import { Time } from '@angular/common';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }


  // createEvent(eventName: string, description: Text, location: Location, eventStartDate: Date, eventStartTime: Time, eventEndDate: Date, eventEndTime: Time): Promise<any> {
  //   return void
  //     firebase
  //       .database()
  //       .ref('/events')
  //       .push({ eventName: eventName, 
  //         description: description,
  //         location: location,
  //         eventStartDate: eventStartDate,
  //         eventStartTime: eventStartTime,
  //         eventEndDate: eventEndDate,
  //         eventEndTime: eventEndTime
  //       });
  // }

}