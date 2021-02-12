import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/serve/register.service';
import { observable, Observable } from "rxjs";
import { Router } from '@angular/router';
@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  myForm : FormGroup;
  successMessage='';

  constructor(private _myservice:RegisterService,private rotuer:Router) {
    this.myForm =new FormGroup({
      mail:new FormControl(null,Validators.email),
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
      cmfpass:new FormControl(null,this.passvalidator)
    });
    this.myForm.controls.password.valueChanges
    .subscribe(
      x=>this.myForm.controls.cmfpass.updateValueAndValidity()
    );



   }

  ngOnInit(): void {
  }

  isValid(controlName:any){
    return this.myForm.get(controlName)?.invalid && this.myForm.get(controlName)?.touched;
  }

  passvalidator(control:AbstractControl){
    if(control&& (control.value!==null|| control.value !==undefined)){
      const cmfpassValue= control.value;
      const passConstrol=control.root.get('password');
      if(passConstrol){
        const passValue=passConstrol.value;
        if(passValue!==cmfpassValue|| passValue==='')
        {
          return{
            isError:true
          };
        }
      }
    }
    return null;
  }
  register(){
    console.log(this.myForm.value)
    if(this.myForm.valid){
      this._myservice.submitegister(this.myForm.value)
      .subscribe(
        data=>{this.successMessage='Register Success';this.rotuer.navigateByUrl('home')  },

        error=>{
          return this.successMessage = 'sorry Please Regist Again';
        }
      );
    }

  }
}
