import { HttpClient } from '@angular/common/http';
import {Headers, Http} from "@angular/http";
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
 error: string;
 user: string;
message:any;
private LOGIN_URL = "http://46.101.26.21/Timesheet/api/";
contentHeader = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
 constructor(public httpClient: HttpClient,  
  private http: Http,) {
   console.log("am here authservice");
 }
  authenticated() {
    this.user =localStorage.getItem('token');
    if(this.user){
      return true;
    }
  }
  /*
  signuserin(usercode,password){
      return this.databaseprovider.getUserData(usercode,password);
  }*/

signuserin(credentials,type){
  console.log(type);
  return new Promise((resolve,reject)=>{
    let headers = new Headers();
    this.http.post(this.LOGIN_URL+type,JSON.stringify(credentials), { headers: headers})
    .subscribe(
      res=>{
        resolve(res.json());
      }),(err)=>{
    reject(err);
  }
});
}
signup(credentials,type){
  console.log(type);
  return new Promise((resolve,reject)=>{
    let headers = new Headers();
    this.http.post(this.LOGIN_URL+type,JSON.stringify(credentials), { headers: headers})
    .subscribe(
      res=>{
        resolve(res.json());
      }),(err)=>{
    reject(err);
  }
});
}

makepayment(paymentdetails,type){
  console.log(type);
  return new Promise((resolve,reject)=>{
    let headers = new Headers();
    this.http.post(this.LOGIN_URL+type,JSON.stringify(paymentdetails), { headers: headers})
    .subscribe(
      res=>{
        resolve(res.json());
      }),(err)=>{
    reject(err);
  }
});
}


getAgentData(usercode,type){
  console.log(type);
  return new Promise((resolve,reject)=>{
    //let headers = new Headers();
    this.http.get(this.LOGIN_URL+type+'/'+usercode)
    .subscribe(
      res=>{
        resolve(res.json());
      }),(err)=>{
    reject(err);
  }
});
}

getAgentTransactions(credentials,type){
  console.log(type);
  console.log(credentials);
  return new Promise((resolve,reject)=>{
   // let headers = new Headers();
    this.http.get(this.LOGIN_URL+type+'/'+credentials)
    .subscribe(
      res=>{
        resolve(res.json());
      }),(err)=>{
    reject(err);
  }
});
}

getCarDetails(usercode,type){
  console.log(type);
  return new Promise((resolve,reject)=>{
   // let headers = new Headers();
    this.http.get(this.LOGIN_URL+type+'/'+usercode)
    .subscribe(
      res=>{
        resolve(res.json());
      }),(err)=>{
    reject(err);
  }
});
}
updatevehicleinfo(vechiledata,type){
  console.log(type);
  return new Promise((resolve,reject)=>{
    let headers = new Headers();
    this.http.post(this.LOGIN_URL+type,JSON.stringify(vechiledata), { headers: headers})
    .subscribe(
      res=>{
        resolve(res.json());
      }),(err)=>{
    reject(err);
  }
});
}
/*
signup(firstname,lastname,email,msisdn,bankname,account,usercode,bvn,password){
  return this.databaseprovider.insertRegistrationData(firstname,lastname,email,msisdn,bankname,account,usercode,bvn,password);
}
createnewdb(){
  return this.databaseprovider.createDatabase();
}*/
authSuccess(token) {
    console.log(token)
    this.error = null;
    localStorage.setItem('token', token);
  }

  signuserout(){
    localStorage.removeItem('userData');
    localStorage.removeItem('token')
  }

}
