import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,} from 'angularfire2/database-deprecated';
import { Time } from '@angular/common';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }

}