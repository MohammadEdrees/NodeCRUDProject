import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { RegisterService } from 'src/app/serve/register.service';
import { Blogs } from 'src/app/_models/blogs';
import { User } from 'src/app/_models/user';
import { BlogsService } from 'src/app/_servives/blogs.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  blogs:Blogs[]=[];
  dashlogged:any;
  userid:any;
  body:string="";
  user:User=new User("","","","","",new Date(),new Date(),[],[],[],"","","")
  
  constructor(private blogsService:BlogsService,private router:Router,private registerService:RegisterService) {
    router.events.subscribe(()=>this.registerService.getlogged().subscribe(a=>{this.dashlogged=a}))
 
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
  followuser()
  {
    this.registerService.getUser(this.userid).subscribe(a=>{
      this.user=a;
      console.log(a);
      this.registerService.followuser(this.userid,this.body).subscribe(d=>console.log(d)
      )
      
    })
  }
  unfollowuser()
  {
    this.registerService.getUser(this.userid).subscribe(a=>{
      this.user=a;
      console.log(a);
      this.registerService.unfollowuser(this.userid,this.body).subscribe(d=>console.log(d)
      )
      
    })
  }


}
