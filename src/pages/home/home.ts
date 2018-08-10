import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user={};
  payments =[];
  usercode:any;
  res:any;
  constructor(public navCtrl: NavController,private auth:AuthProvider) {
    this.usercode = localStorage.getItem('token');
    console.log(this.usercode);
    this.auth.getAgentTransactions(this.usercode,'getAgentTransaction').then(data=>{
      this.res = data;
      this.payments = this.res.payments
      console.log(this.payments);
      /*this.payments = [];
      for(var i=0; i<this.res.payments.length; i++) {
        this.payments.push({usercode:this.res['payments'][i].USERCODE,dateadded:this.res['payments'][i].DATEADDED,walletno:this.res['payments'][i].WALLETNO,wallet:this.res['payments'][i].WALLET,amount:this.res['payments'][i].AMOUNT,comm:this.res['payments'][i].COMMISSION})
      }*/
      console.log(this.payments);
    }).catch(
      err=>{
        console.log(err);
      });
  }
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }
  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.usercode = localStorage.getItem('token');
    console.log(this.usercode);
    this.auth.getAgentTransactions(this.usercode,'getAgentTransaction').then(data=>{
      this.res = data;
      this.payments = this.res.payments
      console.log(this.payments);
    /*  this.payments = [];
      for(var i=0; i<this.res['payments'].length; i++) {
        this.payments.push({usercode:this.res['payments'][i].USERCODE,date:this.res['payments'][i].DATEADDED,walletno:this.res['payments'][i].WALLETNO,wallet:this.res['payments'][i].WALLET,amount:this.res['payments'][i].AMOUNT})
      }*/
    }).catch(
      err=>{
        console.log(err);
      }); 
    
  }

}
