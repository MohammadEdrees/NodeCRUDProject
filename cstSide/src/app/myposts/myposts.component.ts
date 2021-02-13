import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../serve/register.service';
import { Blogs } from '../_models/blogs';
import { User } from '../_models/user';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
  userId:string="";

  blogs:Blogs[]=[];
    constructor(private registerService:RegisterService) {
    this.registerService.getuserId().subscribe(a=>{this.userId=a;console.log(a)})
    this.registerService.getUserPosts(this.userId).subscribe(a=>{this.blogs=a;console.log(a);
    })
   }

  ngOnInit(): void {
  }

}
