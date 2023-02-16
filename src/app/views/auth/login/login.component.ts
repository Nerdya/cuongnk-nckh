import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { APIHelperService } from 'src/app/services/api-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private api: APIHelperService,
    ) {}

  submitForm(): void {
    const body = {
      "username": "0395663678",
      "password": "123456Aa"
    };
    this.api.post('/authenticate/login', body).subscribe((response: HttpResponse<any>) => {
      console.log('response', response);
      if (response.status === 200) {
        // request was successful with a 200 status code
        console.log('Request was successful');
      } else {
        // request was not successful
        console.error('Request failed');
      }
    });
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
