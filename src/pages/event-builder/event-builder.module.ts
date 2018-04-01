import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventBuilderPage } from './event-builder';

@NgModule({
  declarations: [
    EventBuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(EventBuilderPage),
  ],
})
export class EventBuilderPageModule {}
