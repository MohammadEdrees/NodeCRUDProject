import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from 'src/app/serve/register.service';
import  * as moment from "moment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm : FormGroup;

massage='';
  constructor(private _myservice:RegisterService, private _router:Router, private _activteRouter:ActivatedRoute) {
    this.loginForm =new FormGroup({
      mail:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    });
  }

  ngOnInit(): void {
   
  }


  isValid(controlName:any){
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;
  }
  login()
  {
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this._myservice.login(this.loginForm.value)
      .subscribe(
        data => {
        console.log(data);
        let user=data;
        this._myservice.setloggedwhenlogin(true);
        const expiresAt = moment().add(data.expiresIn,'second');
        this._myservice.getlogged().subscribe(a=>{console.log(a)});
        this._myservice.setuserId(data._id);
        localStorage.setItem('token',data.token.toString());
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        
        this._router.navigateByUrl('/home', {skipLocationChange: true});
        
       // this._router.navigate(['../dashboard/4.jpg']);


        },
        error=>{
       // return this.massage='sorry Please Regist Again';
        }
      );

    }

  }


}
