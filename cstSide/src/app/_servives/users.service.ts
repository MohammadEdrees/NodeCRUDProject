import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
userid:any;
  constructor(private http:HttpClient) { }
  getUser(){
 this.http.get<User>("https://myfirstnode7.herokuapp.com/users/:id")
  }
}
