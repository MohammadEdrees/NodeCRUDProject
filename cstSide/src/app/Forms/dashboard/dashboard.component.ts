import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { RegisterService } from 'src/app/serve/register.service';
import { Blogs } from 'src/app/_models/blogs';
import { BlogsService } from 'src/app/_servives/blogs.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  blogs:Blogs[]=[];
  logged:boolean=false;
  
  constructor(private blogsService:BlogsService,private router:Router,registerService:RegisterService) {
   }

  ngOnInit(): void {
   this.blogsService.getAll().subscribe(
     d=>{
       console.log("observe");
       this.blogs=d;

       
       console.log(d);
      },
      err=>{console.log("error");
      }
      
     
   )
  }


  register(){
  console.log('RegClicked');
  
  }
  createpost(){
  console.log('Create Post');

  }
  login(){
  console.log('Login');

  }
  editPost(s:Blogs){
  console.log('EditPost');

  }
  removePost(s:Blogs){
  console.log('removePost');
    
  }
  likePost(){
  console.log('likePost');
  }
  Addcomment(){
  console.log('AdddComment');
  }


}
