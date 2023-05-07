import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LocalStorageService} from "../../../services/local-storage.service";
import {Router} from "@angular/router";
import {AKeysEnum} from "../a-keys.enum";
import {MultiDataControl} from "../../../shared/interfaces/multi-data-control.interface";
import {DataTypeEnum} from "../../../shared/enums/data-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  multiDataControls: MultiDataControl[] = [
    {
      code: AKeysEnum.USERNAME,
      value: null,
      validators: [Validators.required, Validators.pattern(/^\w+$/), Validators.maxLength(255)],
      options: {
        name: 'Tên tài khoản',
        placeholder: 'Tên tài khoản',
        control: new FormControl(),
        dataType: DataTypeEnum.STRING,
        prefixIcon: 'user',
      },
      state: {},
    },
    {
      code: AKeysEnum.PASSWORD,
      value: null,
      validators: [Validators.required, Validators.pattern(/^\w+$/), Validators.maxLength(255)],
      options: {
        name: 'Mật khẩu',
        placeholder: 'Mật khẩu',
        control: new FormControl(),
        dataType: DataTypeEnum.PASSWORD,
        prefixIcon: 'lock',
      },
      state: {},
    },
  ];
  isRequired = (validators: ValidationErrors[]) => {
    return validators.includes(Validators.required);
  }
  remember = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let formDataObj: any = {};
    this.multiDataControls.forEach(element => {
      element.options.control = this.fb.control(element.value, Validators.compose(element.validators));
      formDataObj[element.code] = element.options.control;
    });
    this.loginForm = this.fb.group(formDataObj);
  }

  submit(): void {
    this.multiDataControls.forEach(element => {
      if (this.loginForm.controls[element.code].errors && !element.state.touched) {
        element.state = Object.assign({}, element.state, {touched: true});
      }
    });
    if (!this.loginForm.valid) {
      return;
    }
    let users: any[] = this.localStorageService.getItem('users') ?? [];
    if (!users.length) {
      alert('Không có người dùng trong hệ thống!');
      return;
    }
    let body = this.loginForm.value;
    let valid = users.some((user: any) => {
      if (user[AKeysEnum.USERNAME] === body[AKeysEnum.USERNAME]) {
        if (user[AKeysEnum.PASSWORD] === body[AKeysEnum.PASSWORD]) {
          return true;
        } else {
          this.loginForm.controls[AKeysEnum.PASSWORD].setErrors(null);
          this.loginForm.controls[AKeysEnum.PASSWORD].setErrors({wrongPassword: true});
        }
      }
      return false;
    });
    if (valid) {
      this.router.navigate(['/']);
    } else {
      this.loginForm.controls[AKeysEnum.USERNAME].setErrors(null);
      this.loginForm.controls[AKeysEnum.USERNAME].setErrors({notFound: true});
    }
  }
}
