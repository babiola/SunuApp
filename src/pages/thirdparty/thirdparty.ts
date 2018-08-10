import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';

/**
 * Generated class for the ThirdpartyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thirdparty',
  templateUrl: 'thirdparty.html',
})
export class ThirdpartyPage {
  data ={
    usercode:"",
    vehicleno:"",
    chasisno:"",
    engineno:"",
    color:"",
    model:"",
    capacity:""
  };
  usercode:string;
  responsedata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl:AlertController,
  private loadingCtrl: LoadingController,private auth:AuthProvider) {
    this.usercode = localStorage.getItem('token');
    this.auth.getCarDetails(this.usercode,'getcardetails').then(
      res=>{
        console.log(res['car'][0]);
        this.data = res['car'][0];
      }
    ).catch(err=>{
      console.log(err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdpartyPage');
    
    this.usercode = localStorage.getItem('token');
    this.auth.getCarDetails(this.usercode,'getcardetails').then(
      res=>{
        console.log(res['car'][0]);
        this.data = res['car'][0];
      }
    ).catch(err=>{
      console.log(err);
    });
  }
  confirm(){
    console.log(this.data);
    this.navCtrl.push('PaymentPage');
  }
  update(){
    console.log(this.data);
    this.auth.updatevehicleinfo(this.data,'updatevehicleinfo').then(data=>{
      this.responsedata = data;
      if(this.responsedata['update'][0] ){
        this.navCtrl.push('PaymentPage');
      }
    }).catch(err=>{
    console.log(err);
    });

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
