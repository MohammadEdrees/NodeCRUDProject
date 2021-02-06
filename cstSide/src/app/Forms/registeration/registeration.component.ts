import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/serve/register.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  myForm : FormGroup;
  successMessage='';

  constructor(private _myservice:RegisterService) {
    this.myForm =new FormGroup({
      email:new FormControl(null,Validators.email),
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

  isValid(controlName){
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
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
    this._myservice.submitegister(this.myForm.value)
    .subscribe(
      data=>this.successMessage='Register Success',
      error=>{
        return this.successMessage = 'sorry Please Regist Again';
      }
    )
  }

}
