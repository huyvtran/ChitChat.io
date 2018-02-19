import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventbuilderPage } from './eventbuilder';

@NgModule({
  declarations: [
    EventbuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(EventbuilderPage),
  ],
})
export class EventbuilderPageModule {}
