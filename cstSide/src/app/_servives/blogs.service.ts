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
  addblog(blog:Blogs){
    return this.http.post<Blogs>("https://myfirstnode7.herokuapp.com/posts",blog);
  }
  addblogimg(fd:FormData){
    return this.http.post<Blogs>("https://myfirstnode7.herokuapp.com/posts/image",fd,{
      reportProgress:true,
      observe:'events'
    });
  }
  constructor(private http:HttpClient) { }
}
