import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  data={
    wallet:"",
    walletno:"",
    amount:0,
    pin:"",
    usercode:""
  };
success:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl:AlertController,
    private auth:AuthProvider,
    private toast:Toast,
  private loadingCtrl: LoadingController) {
    this.data.amount = 5000;
    this.data.usercode = localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  makepayment(){
    this.loading.present();
    console.log(this.data);
    this.auth.makepayment(this.data,'makepayment').then(data=>{
      this.success = data;  
        console.log(this.success);
      if(this.success['paid'][0]) {
        this.loading.dismiss();
        this.toast.show('Payment Successful ', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.setRoot('SuccessPage');
          }
        );
         
      }else{
        this.loading.dismiss();
        this.showAlert("Payment","Unable to make payment");
      }
    }).catch(err=>{
      console.log(err);
      this.loading.dismiss();
      this.showAlert("Payment",err);
    })

  }
  cancelpayment(){
    this.navCtrl.setRoot(HomePage);
  }
  
loading = this.loadingCtrl.create({
  content: 'Please wait...'
});
showAlert(title,message) {
  const alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}
}
