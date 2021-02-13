import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blogs } from '../_models/blogs';
import { BlogsService } from '../_servives/blogs.service';

declare var  $:any;

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  blogs:Blogs[]=[];
  //massage="";
  newblog:Blogs=new Blogs("","","",new Date(),0,0,true,"","");
  fd:FormData=new FormData();
  constructor(private blogService:BlogsService,private _router:Router) { }

  onfileselected(event:any){
    var selectedfile=event.target.files[0];
    this.fd=new FormData();
    this.fd.append('img',selectedfile,selectedfile.name);
    console.log(selectedfile);
  }

  save(){
    console.log(this.newblog.title);
    this.fd.append('title',this.newblog.title);
    console.log(this.newblog.body);
    this.fd.append('body',this.newblog.body);
    this.blogService.addblog(this.fd).subscribe(
      a=>{

        console.log(a);
      // return this.massage=" cretae succes"
        this._router.navigate(['/home']);
      }
    )
  }

  ngOnInit(): void {
    this.blogService.getAll().subscribe(
      blogs=>{
       console.log("blog Img"+blogs);
       blogs.forEach(blog => blog.img="https://myfirstnode7.herokuapp.com/posts/image"+blog.img);
        this.blogs=blogs;


      }
    )

  }

}
