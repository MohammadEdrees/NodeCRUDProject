import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from "rxjs";
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

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

}
