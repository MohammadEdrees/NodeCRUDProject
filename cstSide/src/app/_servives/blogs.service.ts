import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blogs } from '../_models/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  getAll(){
   return this.http.get<Blogs[]>("https://myfirstnode7.herokuapp.com/posts");
  }
  constructor(private http:HttpClient) { }
}
