import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userlogin ={
    usercode:"",
    password:""
  };
  usercode:string;
  signupdata:any;
  resdata:any;
  userData = {
    firstname:"",
    lastname:"", 
    email:"", 
    msisdn:"",
    bankname:"",
    account:"", 
    bvn:"",
    password:""
   };
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private alertCtrl:AlertController,
private loadingCtrl: LoadingController,
private toast: Toast,
private storage:Storage,
private authprovider:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(){
    this.loading.present();
     console.log(this.userData);
    this.authprovider.signup(this.userData,'mobilesignup').then(data=>{
      console.log(data);
       this.signupdata = data;
       console.log(this.signupdata.agent);
      if(this.signupdata !=null){
      /*  this.userlogin.usercode =  this.signupdata.agent;
        this.userlogin.password = this.userData.password;*/
       let userlogin ={
          usercode:this.signupdata.agent,
          password:this.userData.password
        }; 
        this.authprovider.signuserin(userlogin,'mobilelogin')
        .then((result)=>{
          this.resdata =result;
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
          console.log(err);
          this.loading.dismiss();
          this.showAlert('Agent Registration',err);
        });  
      }else{
        this.loading.dismiss();
        this.showAlert("Agent Registration","Unable to Register Agent");
      }
    }).catch(err=>{
      console.log(err);
      this.loading.dismiss();
      this.showAlert('Agent Registration',err);
    });
  
  }
  gotosigninpage(){
    this.navCtrl.setRoot('LoginPage');
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
