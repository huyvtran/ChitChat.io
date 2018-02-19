import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeopleAttendingPage } from './people-attending';

@NgModule({
  declarations: [
    PeopleAttendingPage,
  ],
  imports: [
    IonicPageModule.forChild(PeopleAttendingPage),
  ],
})
export class PeopleAttendingPageModule {}
