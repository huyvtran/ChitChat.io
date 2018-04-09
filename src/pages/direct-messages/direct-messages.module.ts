import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectMessagesPage } from './direct-messages';

@NgModule({
  declarations: [
    DirectMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectMessagesPage),
  ],
})
export class DirectMessagesPageModule {}
