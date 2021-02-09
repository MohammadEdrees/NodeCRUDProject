import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../serve/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
logged:any;
  constructor(private registerService:RegisterService,private router:Router) { 
    //this.registerService.getlogged().subscribe(a=>{this.logged=a;console.log(a)})
    router.events.subscribe(()=>this.registerService.getlogged().subscribe(a=>{this.logged=a}))
      }

  ngOnInit(): void {
    
  }
  logout(){
    
  this.registerService.logout();
  this.registerService.setloggedwhenlogin(false);
  this.registerService.getlogged().subscribe(a=>{this.logged=a;console.log(a)});
  this.router.navigateByUrl('/home')
    
  }
  login(){
    this.registerService.getlogged().subscribe(a=>{this.logged=a;console.log(a)});
  }
  

}
