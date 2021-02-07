import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/serve/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm : FormGroup;
massage='';
  constructor(private _myservice:RegisterService) { 
    this.loginForm =new FormGroup({
      email:new FormControl(null,Validators.required),
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
        localStorage.setItem('token',data.toString())
        },
        error=>{
       // return this.massage='sorry Please Regist Again';
        }
      );

    }
    
  }

}
