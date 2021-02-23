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
  addblog(fd:FormData){
    return this.http.post<Blogs>("https://myfirstnode7.herokuapp.com/posts",fd);
  }
  addblogimg(fd:FormData){
    return this.http.post<Blogs>("https://myfirstnode7.herokuapp.com/posts/image",fd,{
      reportProgress:true,
      observe:'events'
    });
  }
  getbyId(id:any){
   return this.http.get<Blogs>("https://myfirstnode7.herokuapp.com/posts/"+id);
  }
  getUserBlogs(uid:any){
    return this.http.post<Blogs[]>("https://myfirstnode7.herokuapp.com/posts/post",uid);
  }
  editBlog(id:any,fd:FormData){
   return this.http.put("https://myfirstnode7.herokuapp.com/posts/"+id,fd)
   
  }
  deleteBlog(bid:any){
   return this.http.delete("https://myfirstnode7.herokuapp.com/posts/"+bid);
  }
  constructor(private http:HttpClient) { }
}
