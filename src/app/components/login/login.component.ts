import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // injection services here

  private readonly _AuthService = inject(AuthService) ;
  private readonly _Router = inject(Router) ;
  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _ToastrService = inject(ToastrService) ;
  private readonly _DestroyRef = inject(DestroyRef) ;



  // form login info
  loginForm:FormGroup = this._FormBuilder.group({
    username :["1" , [Validators.required , Validators.minLength(1) , Validators.maxLength(30)]] ,
    Password :["123456" , [Validators.required , Validators.pattern(/^[A-Za-z0-9]{6,}$/)]] ,
  }) ;


  // login Submit

  loginSubmit () {

    if (this.loginForm.valid) {

      this._AuthService.login(this.loginForm.value).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
        next:(res)=>{
          // console.log(res);

          if (res.access_token) {
             localStorage.setItem("App_Token" , res.access_token) ;
          // this._AuthService.SaveToken() ;
          this._ToastrService.success("SuccessLogin" , "Seafarer Management System")  ;

          this._Router.navigate(["/seafarerslist"]) ;
          }




        },

        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      })
    } else {


      this.loginForm.markAllAsTouched() ;
    }
  }

  

}
