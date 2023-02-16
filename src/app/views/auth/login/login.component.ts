import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../../../services/subscription.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subscription: SubscriptionService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    const form = this.validateForm;
    if (form.valid) {
      this.subscription.subscribeToObservable(
        this.authService.login(form.value.username, form.value.password),
        (res: HttpResponse<any>) => {
          if (res.status === 200) {
            console.log('Request was successful', res);
          }
        },
        (e) => {
          console.error('Request failed', e);
          console.error('Error message:', e.error?.message);
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
