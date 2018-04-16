import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageFollowersPage } from './message-followers';

@NgModule({
  declarations: [
    MessageFollowersPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageFollowersPage),
  ],
})
export class MessageFollowersPageModule {}
