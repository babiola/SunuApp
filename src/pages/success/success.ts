import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController) {
    this.showAlert('Payment','Payment recieved successfully');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccessPage');
  }

  gotohomepage(){
    this.navCtrl.setRoot('HomePage');
  }
  showAlert(title,message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
