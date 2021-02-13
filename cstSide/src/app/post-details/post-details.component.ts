import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from '../_models/blogs';
import { BlogsService } from '../_servives/blogs.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
blog:Blogs=new Blogs("","","",new Date(),0,0,false,"","");
  constructor(private blogsService:BlogsService,private active:ActivatedRoute) { }

  ngOnInit(): void {
    let id=0;
    this.active.params.subscribe(a=>
      {
        id=a['id']
        console.log(id);
      this.blogsService.getbyId(id).subscribe(a=>{console.log(a);this.blog=a})
    
      
    
    })
  }

}
