import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http:HttpClient) { }
  submitegister(body:any){
    return this._http.post('https://myfirstnode7.herokuapp.com/users/',body,{
      observe:'body'
    })
  }
}
