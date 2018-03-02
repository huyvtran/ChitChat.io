import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsPage } from '../../pages/events/events';
import { EventCreateProvider } from '../../providers/event-create/event-create';
/**
 * Generated class for the EventbuilderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventbuilder',
  templateUrl: 'event-builder.html',
})
export class EventBuilderPage {
  public eventCreateForm: FormGroup;
  public loading: Loading;
  constructor(
    public eventProvider: EventCreateProvider,
    public navCtrl: NavController, 
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
      this.eventCreateForm = formBuilder.group({
        eventName: [''],
        description: [''],
        location: [''],
        startDate: [''], 
        startTime: [''],
        endDate: [''],
        endTime: ['']
      });
    }

    createEvent(){
    if (!this.eventCreateForm.valid){
      console.log(this.eventCreateForm.value);
    } else {
      this.eventProvider.createEvent(this.eventCreateForm.value.eventName, this.eventCreateForm.value.description, this.eventCreateForm.value.location, this.eventCreateForm.value.startDate, this.eventCreateForm.value.startTime, this.eventCreateForm.value.endDate, this.eventCreateForm.value.endTime)
      .then(() => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(EventsPage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventbuilderPage');
  }

}
