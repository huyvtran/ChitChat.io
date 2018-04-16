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
chats=new Array()
  constructor(public db: AngularFireDatabase,public http: Http,public fAuth: AngularFireAuth) {
  this.getChats()
  }
  getChats(){
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {
   
      this.userKey=dataSnap.key
      
      firebase.database().ref('userProfiles/'+this.userKey+'/DMs').on('child_added', (dataSnap) => {
  this.chats.push(dataSnap.val().messageID)
      })
    })
  }
  inviteFriends(friends,eventID,imageID,eventName){
    var userKey
    var userKey2
    if(friends){
    for(var i=0;i<friends.length;i++){
      this.loop(i,friends,eventID,imageID,eventName)
 }}
  }
  loop(i,friends,eventID,imageID,eventName){

    var userKey
    var userKey2
    var add=true

    for(var z=0;z<this.chats.length;z++){
     
      firebase.database().ref('DirectMessages/'+this.chats[z]+'/users').on('child_added', (dataSnap) => {
 
    if(friends[i]==dataSnap.val().userID){
     
      this.db.list('DirectMessages/'+this.chats[z]+'/chat').push({
        username: this.fAuth.auth.currentUser.displayName,
        message: "I want you to join my event!",
        eventID:eventID,
        eventName:eventName,
        eventImage:imageID,
        event:true
      }).then( () => {
        // message is sent
      })
      add=false
    }
      })
      
   
    }
    if(add==true){
    //do all this if a chat room between the 2 doesnt already exsist
  this.db.list('DirectMessages/').push({
  
  }).then((message)=>{
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(this.fAuth.auth.currentUser.uid).once('child_added', (dataSnap) => {

      userKey=dataSnap.key
     
     
    }).then(()=>{
      this.db.list('userProfiles/'+userKey+'/DMs').push({
        messageID:message.key
      })
    })
    
    firebase.database().ref('userProfiles/').orderByChild('userID').equalTo(friends[i]).once('child_added', (dataSnap) => {

      userKey2=dataSnap.key
     
     
    }).then(()=>{
      this.db.list('userProfiles/'+userKey2+'/DMs').push({
        messageID:message.key
      })
    })
    

    this.db.list('DirectMessages/'+message.key+'/users').push({
      userID:friends[i]
    }).then(()=>{
      this.db.list('DirectMessages/'+message.key+'/users').push({
        userID:this.fAuth.auth.currentUser.uid
      })
    })

    this.db.list('DirectMessages/'+message.key+'/chat').push({
      username: this.fAuth.auth.currentUser.displayName,
      message: "I want you to join my event!",
      eventID:eventID,
      eventName:eventName,
      eventImage:imageID,
      event:true
    }).then( () => {
      // message is sent
    })

  })}else{
   
  }
  }
   createEvent(imageID,userID,eventName: string, description: Text, location: Location, eventStartDate: Date, eventStartTime: Time, eventEndDate: Date, eventEndTime: Time, eventLat, eventLng,pub,friends): Promise<any> {
    
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
         this.inviteFriends(friends,evnt.key,imageID,eventName)
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