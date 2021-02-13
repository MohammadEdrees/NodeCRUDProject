import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../serve/register.service';
import { Blogs } from '../_models/blogs';
import { User } from '../_models/user';
import { BlogsService } from '../_servives/blogs.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
  
id:any;
  blogs:Blogs[]=[];
    constructor(private blogsSrevice:BlogsService,private registerService:RegisterService,private active:ActivatedRoute,private router:Router) {
    
   }

  ngOnInit(): void {
    let id=0;
    this.active.params.subscribe(a=>{
      id=a['id'];
      console.log(id);
      this.blogsSrevice.getUserBlogs(id).subscribe(a=>{this.blogs=a;console.log(a);
      })
    });
    
  }
  deleteById(){
    console.log(this.id);
    this.blogsSrevice.deleteBlog(this.id).subscribe(a=>console.log(a)
    )
    console.log(this.id)
    
    this.router.navigateByUrl('/profile')

    

  }

}
