import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { observable, Observable } from "rxjs";
import { User } from '../_models/user';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
logged:boolean=false;
userID:string="";
  constructor(private _http:HttpClient) { }
  submitegister(body:any){
    return this._http.post(' https://myfirstnode7.herokuapp.com/users/ ',body,{
      observe:'body'
    })
    
  }

  login(body:any){
    return this._http.post<User>('https://myfirstnode7.herokuapp.com/users/login',body,{
      observe:'body'
    })
    
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
}
public isLoggedIn():boolean {
  return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
  return !this.isLoggedIn();
}

getExpiration() {
  const expiration = localStorage.getItem("expires_at");
  const expiresAt = JSON.parse(JSON.stringify( expiration));
  return moment(expiresAt);
}    
setloggedwhenlogin(s:boolean){
  this.logged=s;
}
getlogged(){
  return new Observable<any>(obj=>{obj.next(this.logged)})
}
setuserId(id:string){
  this.userID=id;
}
getuserId(){
  return new Observable<any>(obj=>{obj.next(this.userID)})
}
getUser(id:string){
 return this._http.get<User>("https://myfirstnode7.herokuapp.com/users/"+id)
   }
  

}
