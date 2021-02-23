import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from '../_models/blogs';
import { BlogsService } from '../_servives/blogs.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  blog:Blogs=new Blogs("","","",new Date(),0,0,false,"","");
  id:any=0;
  constructor(private BlogsServis:BlogsService,private active:ActivatedRoute) { }

  ngOnInit(): void {

    this.active.params.subscribe(a=>{
      this.id=a['id']
      console.log(a['id']);
      this.BlogsServis.getbyId(this.id).subscribe(a=>{
      this.blog=a;
      console.log(a);
      })

    })
  }
  save(){
    console.log(this.blog);
<<<<<<< HEAD
     console.log(this.blog.title);
    this.fd.append('title',this.blog.title);
    console.log(this.blog.body);
    this.fd.append('body',this.blog.body);

    this.BlogsServis.editBlog(this.blog._id,this.fd).subscribe(d=>console.log(d)
=======
    
    this.BlogsServis.editBlog(this.blog._id,this.blog).subscribe(d=>console.log(d)
>>>>>>> parent of 212aad9 (z)
    )
  }

}
