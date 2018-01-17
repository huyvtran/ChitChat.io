
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
 
@Injectable()
export class DatabaseProvider {
  public database: SQLiteObject;
  date:Date;
  private databaseReady: BehaviorSubject<boolean>;
  firstName;
  lastName;
  public userID;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
   
    this.platform.ready().then(() => {
      
      this.sqlite.create({
        name: 'maxlife.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          
          this.database = db;
          
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              
              this.createTables();
            }
          });
        });
    });
  }
 setDate(date){this.date=date;}
  createTables() {
    // this.http.get('sampleSql.sql')
    //   .map(res => res.text())
    //   .subscribe(sql => {
    //     alert("hi");
    //     this.sqlitePorter.importSqlToDb(this.database, sql)
    //       .then(data => {
    //         this.databaseReady.next(true);
    //         this.storage.set('database_filled', true);
    //       })
    //       .catch(e => console.error(e));
    //   });
    alert("Creating tables");
    this.databaseReady.next(true);
    this.database.executeSql("CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT,creatorID INTEGER,userID INTEGER,title TEXT,desc TEXT,location TEXT, start SMALLDATETIME, end SMALLDATETIME, length FLOAT,public TEXT)", err => {
      alert('Error: ');
      return err;
    });
    this.database.executeSql("CREATE TABLE IF NOT EXISTS users(userID INTEGER PRIMARY KEY AUTOINCREMENT,firstName TEXT,lastName TEXT,email TEXT, pass TEXT)", err => {
      alert('Error: ');
      alert(err);
      return err;
    });
    this.database.executeSql("CREATE TABLE IF NOT EXISTS friends(id INTEGER PRIMARY KEY AUTOINCREMENT,friend1 INTEGER,friend2 INTEGER,accept1 INTEGER,accept2 INTEGER)", err => {
      alert('Error: ');
      alert(err);
      return err;
    });
    this.database.executeSql("CREATE TABLE IF NOT EXISTS user_events(usereventid INTEGER PRIMARY KEY AUTOINCREMENT,eventID INTEGER,userID INTEGER)", err => {
      alert('Error: ');
      alert(err);
      return err;
    });
    this.database.executeSql("CREATE TABLE IF NOT EXISTS tasks(taskID INTEGER PRIMARY KEY AUTOINCREMENT,userID INTEGER,title TEXT, complete TEXT)", err => {
      alert('Error: ');
      alert(err);
      return err;
    });
    // let data = ["Get Groceries", "Go to the store and get groceries", "The store",new Date(),new Date(),new Date()];
    // this.database.executeSql("INSERT INTO events (title,desc,location,date, start, end) VALUES (?, ?, ?,?,?,?)", data)
    // , err => {
    //   console.log('Error: ', err);
    // };

    // this.database.executeSql("SELECT * FROM events", []).then((data) => {
      
    //   if (data.rows.length > 0) {
    //     for (var i = 0; i < data.rows.length; i++) {
    //       alert("tits"+ data.rows.item(i).title);
    //     }
    //   }
      
    // }, err => {
    //   console.log('Error: ', err);
    //   return [];
    // });
  }
  getUserTasks(){
    return this.database.executeSql("SELECT * FROM tasks WHERE userID=? AND complete='No'", [this.userID]).then((data) => {
      let  developers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
        
        
       
          developers.push({ taskID:data.rows.item(i).taskID,userID:data.rows.item(i).userID,eventID:data.rows.item(i).id,title: data.rows.item(i).title});
        
          
          
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
  addTask(title){
    let data = [this.userID,title,'No'];
    return this.database.executeSql("INSERT INTO tasks (userID,title,complete) VALUES (?,?,?)", data).then(data => {
     
      return data;
      
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
  completeTask(taskID){
    let data = [taskID];
  
    return this.database.executeSql("UPDATE tasks SET complete='Yes' WHERE taskID=?", data).then(data => {
      
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
  findFriendshipStatus2(user1,user2){
    return this.database.executeSql("SELECT * FROM friends WHERE (friend1=? OR friend1=?) AND (friend2=? OR friend2=?) ", [user1,user2,user1,user2]).then(data => {
     
     if (data.rows.length > 0) {
       for (var i = 0; i < data.rows.length; i++) {
 
        if(data.rows.item(i).accept1==1 && data.rows.item(i).accept2==1){
           //you are friends
           //alert("You are friends");
           return "Friends";
         }
         else if(data.rows.item(i).friend1==this.userID && data.rows.item(i).accept1==1 && data.rows.item(i).accept2==0){
                 //you requested
                 //alert("You requested ")
                 return "Cancel";
 
         }
         else if(data.rows.item(i).friend1!=this.userID && data.rows.item(i).accept1==1 && data.rows.item(i).accept2==0){
           //they requested
           //alert("They request")
           return "Accept";
   }
       }
     }else{
       if(user1==user2){
         //alert("This is you");
         return "You";
       }else{
         //alert("No one has requested");
         return "Add";
         
       }
       
     }
     return "";
   }, err => {
     alert(err);
     return "";
   });
 }  
findFriendshipStatus(user1,user2){
   return this.database.executeSql("SELECT * FROM friends WHERE (friend1=? OR friend1=?) AND (friend2=? OR friend2=?) ", [user1,user2,user1,user2]).then(data => {
    
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {

       if(data.rows.item(i).accept1==1 && data.rows.item(i).accept2==1){
          //you are friends
          //alert("You are friends");
          return "Friends";
        }
        else if(data.rows.item(i).friend1==this.userID && data.rows.item(i).accept1==1 && data.rows.item(i).accept2==0){
                //you requested
                //alert("You requested ")
                return "Cancel Request";

        }
        else if(data.rows.item(i).friend1!=this.userID && data.rows.item(i).accept1==1 && data.rows.item(i).accept2==0){
          //they requested
          //alert("They request")
          return "Accept Friend Request";
  }
      }
    }else{
      if(user1==user2){
        //alert("This is you");
        return "Edit Profile";
      }else{
        //alert("No one has requested");
        return "Send Friend Request";
        
      }
      
    }
    return "";
  }, err => {
    alert(err);
    return "";
  });
}  
requestFriendship(f1,f2){
  let data = [f1,f2,1,0];
  alert("Requsting friend to user "+f2);
  return this.database.executeSql("INSERT INTO friends (friend1,friend2,accept1,accept2) VALUES (?,?,?,?)", data).then(data => {
    return data;
  }, err => {
    console.log('Error: ', err);
    return err;
  });
}
acceptFriendship(user){
  let data = [this.userID,user];
  
  return this.database.executeSql("UPDATE friends SET accept2=1 WHERE friend2=? AND friend1=?", data).then(data => {
    alert("Creating a friendship between users "+this.userID+" and "+user);
    return data;
  }, err => {
    console.log('Error: ', err);
    return err;
  });
}
declineFriendship2(user1,user2){
 
  this.database.executeSql("DELETE FROM friends WHERE friend1=? AND friend2=?", [user2,user1]).then((data) => {
  
 
  }, err => {
    console.log('Error: ', err);
    
  });
}
declineFriendship(entry){
 
  this.database.executeSql("DELETE FROM friends WHERE id=?", [entry]).then((data) => {
  
 
  }, err => {
    console.log('Error: ', err);
    
  });
}
getFriendRequests(){

  return this.database.executeSql("SELECT users.firstName,users.lastName,friends.id,friends.friend1 FROM users INNER JOIN friends ON friends.friend1=users.userID WHERE friends.friend2=? AND friends.accept1=1 AND friends.accept2=0 ", [this.userID]).then(data => {
    let  users = [];
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
        
        users.push({id:data.rows.item(i).id,user:data.rows.item(i).friend1,firstName:data.rows.item(i).firstName,lastName:data.rows.item(i).lastName})
      }
    }
    return users;
  }, err => {
    console.log('Error: ', err);
    return [];
  });
}

getAllFromFriends(){
  
  this.database.executeSql("SELECT * FROM friends",[]).then(data => {
   alert("hello");
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
        alert(data.rows.item(i).friend1+" "+data.rows.item(i).friend2+" "+data.rows.item(i).accept1+" "+data.rows.item(i).accept2);
      }
    }
   
  }, err => {
    console.log('Error: ', err);
    
  });
}

getFriends(){
  
  return this.database.executeSql("SELECT  users.firstName,users.lastName,friends.friend1, friends.friend2, CASE WHEN friends.friend1=? THEN friends.friend2 ELSE friends.friend1 END AS friend FROM friends,users WHERE users.userID=friend AND (friends.friend2=? OR friends.friend1=?) AND friends.accept1=1 AND friends.accept2=1 ", [this.userID,this.userID,this.userID]).then(data => {
    let  users = [];
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
     
        users.push({friend:data.rows.item(i).friend,firstName:data.rows.item(i).firstName,lastName:data.rows.item(i).lastName  });
        
        
      }
    }
    return users;
  }, err => {
    console.log('Error: ', err);
    return [];
  });
}
selectAllFromUserEvents(){
  return this.database.executeSql("SELECT * FROM user_events,events WHERE user_events.userID=? AND events.id=user_events.eventID ORDER BY events.start ASC ",[this.userID]).then(data => {
     let events=[];
     if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
      //  alert(this.date.getDay()+"/ "+this.date.getMonth()+"/"+this.date.getFullYear());
        //alert(data.rows.item(i).start.getDay()+"/ "+data.rows.item(i).start.getMonth()+"/"+data.rows.item(i).start.getFullYear());
       // alert(data.rows.item(i).start);
      // alert(data.rows.item(i).start);
      var compStart=this.date.toISOString().slice(0, 10).replace('T', ' ');
      var comp=data.rows.item(i).start.slice(0, 10).replace('T', ' ');
      
      if(compStart==comp)
      {
        events.push({ usereventID:data.rows.item(i).usereventid,creatorID:data.rows.item(i).creatorID,userID:data.rows.item(i).userID,eventID:data.rows.item(i).id,title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length,pub:data.rows.item(i).public });
      }
        
        
      }
    }
    return events;
    
   }, err => {
     console.log('Error: ', err);
     return[];
   });
}
getRecommendedEvents(start,end){
  //get events within the time range that user is not attending
  return this.database.executeSql("SELECT *, sum(user_events.userID=?) AS times FROM events LEFT JOIN  user_events ON events.id=user_events.eventID WHERE events.public='Yes' GROUP BY events.id ORDER BY events.start ASC" , [this.userID]).then((data) => {
    let  developers = [];
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
       var eventStart=new Date(data.rows.item(i).start);
       var eventEnd=new Date(data.rows.item(i).end);
       var times=data.rows.item(i).times;
        if(eventStart>=start && eventEnd<=end && times==0 ){
        developers.push({eventID:data.rows.item(i).id,userID:data.rows.item(i).userID, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length,pub:data.rows.item(i).public });
        }
      }
        
        
      
    }
    return developers;
  }, err => {
    console.log('Error: ', err);
    return [];
  });
}
getAttendees(eventid){
  return this.database.executeSql("SELECT * FROM user_events,users WHERE user_events.eventID=? AND users.userID=user_events.userID ORDER BY users.lastName",[eventid]).then(data => {
    let attendees=[];
    if (data.rows.length > 0) {
     for (var i = 0; i < data.rows.length; i++) {
 
  
  
       attendees.push({ userID:data.rows.item(i).userID,firstName:data.rows.item(i).firstName,lastName:data.rows.item(i).lastName});
     
    
       
     }
   }
   return attendees;
   
  }, err => {
    console.log('Error: ', err);
    return[];
  });
}
  addUserToEvent(eventID,userID){
    let data = [eventID,userID];
    alert("Adding user"+userID+" to event "+eventID);
    this.database.executeSql("INSERT INTO user_events(eventID,userID) VALUES (?,?)", data).then(data => {

      this.database.executeSql("SELECT * FROM user_events,events WHERE user_events.userID=? AND events.id=user_events.eventID", [this.userID]).then(data => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            alert("You are addded to event "+data.rows.item(i).title);
          }
         
        }
      }, err => {
        alert( "This is a addUser error "+err);
        
      });


     
    }, err => {
      alert( "This is a addUser error "+err);
      
    });
  }
setUserID(id){
  this.userID=id;
}
  addUser(firstName,lastName,email,pass) {
    
    let data = [firstName,lastName, email, pass];
    return this.database.executeSql("INSERT INTO users(firstName,lastName,email,pass) VALUES (?,?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      alert( "This is a addUser error "+err);
      return err;
    });
  }

  addEvent(creatorID,userID,title, desc, location,start,end,hours,pub) {
    let data = [creatorID,userID,title, desc, location,start,end,hours,pub];
    return this.database.executeSql("INSERT INTO events (creatorID,userID,title,desc,location, start, end,length,public) VALUES (?,?,?, ?, ?,?,?,?,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
  removeUserFromEvent(usereventID){
    alert("Removing userevent "+usereventID)
    this.database.executeSql("DELETE FROM user_events WHERE usereventid=?", [usereventID]).then((data) => {

   
    }, err => {
      console.log('Error: ', err);
      
    });
  }
 removeEvent(eventID){
this.database.executeSql("DELETE FROM events WHERE id=?", [eventID]).then((data) => {

   
  }, err => {
    console.log('Error: ', err);
    
  });
 }
 getLastEventEntered(){
   alert("Hi")
  return this.database.executeSql("SELECT id FROM events WHERE userID=? ORDER BY id DESC LIMIT 1", [this.userID]).then((data) => {
    let  developers = [];
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
        alert(data.rows.item(i).id );
        developers.push({  id: data.rows.item(i).id });
      
        
        
      }
    }
    return developers;
  }, err => {
    alert('Error: ');
    return [];
  });
 }
 getEveryEventForUser(){
  return this.database.executeSql("SELECT * FROM user_events,events WHERE user_events.userID=? AND events.id=user_events.eventID",[this.userID]).then(data => {
    let events=[];
    if (data.rows.length > 0) {
     for (var i = 0; i < data.rows.length; i++) {

  
       events.push({ usereventID:data.rows.item(i).usereventid,creatorID:data.rows.item(i).creatorID,userID:data.rows.item(i).userID,eventID:data.rows.item(i).id,title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length,pub:data.rows.item(i).public });
 
     }
   }
   return events;
   
  }, err => {
    console.log('Error: ', err);
    return[];
  });
 }
  getAllEvents() {
    // return this.database.executeSql("SELECT * FROM events WHERE userID=? ORDER BY start ASC", [this.userID]).then((data) => {
    //   let  developers = [];
    //   if (data.rows.length > 0) {
    //     for (var i = 0; i < data.rows.length; i++) {
    //     //  alert(this.date.getDay()+"/ "+this.date.getMonth()+"/"+this.date.getFullYear());
    //       //alert(data.rows.item(i).start.getDay()+"/ "+data.rows.item(i).start.getMonth()+"/"+data.rows.item(i).start.getFullYear());
    //      // alert(data.rows.item(i).start);
    //     // alert(data.rows.item(i).start);
    //     var compStart=this.date.toISOString().slice(0, 10).replace('T', ' ');
    //     var comp=data.rows.item(i).start.slice(0, 10).replace('T', ' ');
        
    //     if(compStart==comp)
    //     {
    //       developers.push({ userID:data.rows.item(i).userID,eventID:data.rows.item(i).id,title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length,pub:data.rows.item(i).public });
    //     }
          
          
    //     }
    //   }
    //   return developers;
    // }, err => {
    //   console.log('Error: ', err);
    //   return [];
    // });
    return this.database.executeSql("SELECT * FROM events WHERE userID=? ORDER BY start ASC", [this.userID]).then((data) => {
      let  developers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
        //  alert(this.date.getDay()+"/ "+this.date.getMonth()+"/"+this.date.getFullYear());
          //alert(data.rows.item(i).start.getDay()+"/ "+data.rows.item(i).start.getMonth()+"/"+data.rows.item(i).start.getFullYear());
         // alert(data.rows.item(i).start);
        // alert(data.rows.item(i).start);
        var compStart=this.date.toISOString().slice(0, 10).replace('T', ' ');
        var comp=data.rows.item(i).start.slice(0, 10).replace('T', ' ');
        
        if(compStart==comp)
        {
          developers.push({ creatorID:data.rows.item(i).creatorID,userID:data.rows.item(i).userID,eventID:data.rows.item(i).id,title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length,pub:data.rows.item(i).public });
        }
          
          
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
  getUser(userID){
    return this.database.executeSql("SELECT * FROM users WHERE userID=? ", [userID]).then((data) => {
      let  user = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          user.push({userID:data.rows.item(i).firstName, firstName:data.rows.item(i).firstName,lastName:data.rows.item(i).lastName});
      
          
          
        }
      }
      return user;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
  getAllPublicEvents(date:Date) {
    return this.database.executeSql("SELECT * FROM events WHERE public='Yes' ORDER BY start ASC", []).then((data) => {
      let  developers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
        //  alert(this.date.getDay()+"/ "+this.date.getMonth()+"/"+this.date.getFullYear());
          //alert(data.rows.item(i).start.getDay()+"/ "+data.rows.item(i).start.getMonth()+"/"+data.rows.item(i).start.getFullYear());
         // alert(data.rows.item(i).start);
        // alert(data.rows.item(i).start);
        var compStart=date.toISOString().slice(0, 10).replace('T', ' ');
        var comp=data.rows.item(i).start.slice(0, 10).replace('T', ' ');
        var now = new Date();
        var eventStart= new Date(data.rows.item(i).start);
        
        if(now<eventStart && compStart==comp){
       //get events after current date only
          developers.push({eventID:data.rows.item(i).id,userID:data.rows.item(i).userID, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length,pub:data.rows.item(i).public });
        }
          
          
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  getEvents() {
    return this.database.executeSql("SELECT * FROM events ORDER BY start ASC", []).then((data) => {
      let  developers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
  
        
    
          developers.push({eventID:data.rows.item(i).id,userID:data.rows.item(i).userID, title: data.rows.item(i).title, desc: data.rows.item(i).desc, location: data.rows.item(i).location,start: data.rows.item(i).start,end: data.rows.item(i).end,length: data.rows.item(i).length});
          
          
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}