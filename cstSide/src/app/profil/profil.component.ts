import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../serve/register.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

userId:string="";

user:User=new User("","","","","",new Date(),new Date(),[],[],[],"","","")
  constructor(private registerService:RegisterService) {
    this.registerService.getuserId().subscribe(a=>{this.userId=a;console.log(a)})
    this.registerService.getUser(this.userId).subscribe(a=>{this.user=a})
  }

  ngOnInit(): void {

  }

}
