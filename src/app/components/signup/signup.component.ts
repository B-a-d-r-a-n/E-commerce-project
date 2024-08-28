import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utils/confir,-password.utils';
import { signupValidators } from '../../shared/validators/register.validators';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  errorMessage: string = '';
  isBtnSubmit: boolean = false;
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  register = new FormGroup(
    {
      name: new FormControl(null, signupValidators.name),
      email: new FormControl(null, signupValidators.email),
      password: new FormControl(null, signupValidators.password),
      rePassword: new FormControl(null, signupValidators.rePassword),
    },
    confirmPassword
  );

  /*  بيبوظ الري باسوورد  */

  // register: FormGroup = this._FormBuilder.group(
  //   {
  //     name: [null, signupValidators.name],
  //     email: [null, signupValidators.email],
  //     password: [null, signupValidators.password],
  //     rePassword: [null, signupValidators.rePassword],
  //   },
  //   { Validators: [confirmPassword] }
  // );

  sendData() {
    this.isBtnSubmit = true;
    this._AuthService.signup(this.register.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          console.log(this.register.value);

          this._Router.navigate(['/signin']);
          this.isBtnSubmit = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        this.isBtnSubmit = false;
      },
    });
  }
}
