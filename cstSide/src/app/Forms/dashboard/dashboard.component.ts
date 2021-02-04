import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) {

   }

  ngOnInit(): void {
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
  editPost(){
  console.log('EditPost');

  }
  removePost(){
  console.log('removePost');
    
  }
  likePost(){
  console.log('likePost');
  }
  Addcomment(){
  console.log('AdddComment');
  }


}
