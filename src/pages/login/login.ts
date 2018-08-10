import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/Storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userlogin ={
    usercode:"",
    password:""
  };  
  resdata:any;
userData:any;
user = {
  firstname:"",
  lastname:"", 
  email:"", 
  msisdn:"",
  bankname:"",
  account:"", 
  bvn:"",
  usercode:"",
  password:"",
  dateadded:Date
 };
   // When the page loads, we want the Login segment to be selected
   authType: string = "login";

   // We need to set the content type for the server

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private authprovider:AuthProvider,
     private toast: Toast,
     private storage:Storage,
     private loadingCtrl: LoadingController,
  private alertCtrl:AlertController) {
  }

  authenticate(credentials) {
    this.authType == 'login' ? this.login() : this.signup(credentials);
  }
  login() {
    if(this.userlogin.usercode =="" || this.userlogin.password ==""){
      this.showAlert("User Sign","Fill in Agent data");
    }else{
    console.log(this.userlogin);
    this.loading.present();
    this.authprovider.signuserin(this.userlogin,'mobilelogin')
    .then((result)=>{
      this.resdata = result;
      console.log(this.resdata['userData'][0].FIRSTNAME);
      console.log(this.resdata['userData'][0]['FIRSTNAME']);
      if(this.resdata['userData']!=null) {
        this.user.firstname = this.resdata['userData'][0].FIRSTNAME;
        this.user.lastname = this.resdata['userData'][0].LASTNAME;
        this.user.email = this.resdata['userData'][0].EMAIL;
        this.user.msisdn = this.resdata['userData'][0].MSISDN;
        this.user.bankname = this.resdata['userData'][0].BANKNAME;
        this.user.account = this.resdata['userData'][0].ACCOUNT;
        this.user.bvn = this.resdata['userData'][0].BVN;
        this.user.password = this.resdata['userData'][0].PASSWORD;
        this.user.usercode = this.resdata['userData'][0].USERCODE;
        this.user.dateadded = this.resdata['userData'][0].DATEADDED;
        localStorage.setItem('userData',JSON.stringify(this.user));
        this.storage.set('userData',JSON.stringify(this.user));
        this.authprovider.authSuccess(this.user.usercode);
        this.loading.dismiss();
        this.toast.show('Welcome ', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.setRoot('HomePage');
          });
      }else{
        this.loading.dismiss();
        this.showAlert("User Sign","Unable to get Agent data");
      }
    }).catch(err=>{
      this.loading.dismiss();
      this.showAlert('Network Error',err);
    });
  }
  }
  gotosignuppage(){
    this.navCtrl.setRoot('RegisterPage');
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

  logout() {
    this.authprovider.signuserout();
    this.user = null;
  }


  signup(credentials){
    console.log(credentials);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


}
