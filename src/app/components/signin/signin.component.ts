import { Component, inject } from '@angular/core';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { signupValidators } from '../../shared/validators/register.validators';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AlertErrorComponent, NgClass, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  errorMessage: string = '';
  isBtnSubmit: boolean = false;
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  login: FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email],
    password: [null, signupValidators.password],
  });

  sendData() {
    this.isBtnSubmit = true;
    this._AuthService.signin(this.login.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          localStorage.setItem('token', res.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
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
