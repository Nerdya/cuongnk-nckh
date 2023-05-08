import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {DataTypeEnum} from "../../../shared/enums/data-type.enum";
import {MultiDataControl} from "../../../shared/interfaces/multi-data-control.interface";
import {AKeysEnum} from "../a-keys.enum";
import {LocalStorageService} from "../../../services/local-storage.service";
import {removeProperty} from "../../../shared/functions/common.function";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.registerForm.controls[AKeysEnum.PASSWORD].value) {
      return {confirm: true};
    }
    return {};
  };
  multiDataControls: MultiDataControl[] = [
    {
      code: AKeysEnum.USERNAME,
      value: null,
      validators: [Validators.required, Validators.maxLength(255)],
      options: {
        name: 'Tên tài khoản',
        control: new FormControl(),
        dataType: DataTypeEnum.STRING,
      },
      state: {},
    },
    {
      code: AKeysEnum.PASSWORD,
      value: null,
      validators: [Validators.required, Validators.maxLength(255)],
      options: {
        name: 'Mật khẩu',
        control: new FormControl(),
        dataType: DataTypeEnum.PASSWORD,
      },
      state: {},
    },
    {
      code: AKeysEnum.CHECK_PASSWORD,
      value: null,
      validators: [Validators.required, this.confirmationValidator],
      options: {
        name: 'Mật khẩu xác thực',
        control: new FormControl(),
        dataType: DataTypeEnum.PASSWORD,
      },
      state: {},
    },
    {
      code: AKeysEnum.FULL_NAME,
      value: null,
      validators: [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z]).+$/)],
      options: {
        name: 'Họ tên',
        control: new FormControl(),
        dataType: DataTypeEnum.STRING,
      },
      state: {},
    },
    {
      code: AKeysEnum.EMAIL,
      value: null,
      validators: [Validators.required, Validators.email, Validators.maxLength(255)],
      options: {
        name: 'Email',
        control: new FormControl(),
        dataType: DataTypeEnum.STRING,
      },
      state: {},
    },
  ];
  isRequired = (validators: ValidationErrors[]) => {
    return validators.includes(Validators.required);
  }
  agree = false;

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
    this.registerForm = this.fb.group(formDataObj);
  }

  submitForm(): void {
    this.multiDataControls.forEach(element => {
      if (this.registerForm.controls[element.code].errors && !element.state.touched) {
        element.state = Object.assign({}, element.state, {touched: true});
      }
    });
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    let users: any[] = this.localStorageService.getItem('users') ?? [];
    let body = removeProperty(this.registerForm.value, AKeysEnum.CHECK_PASSWORD)
    let valid = !users.some((user: any) => {
      if (user[AKeysEnum.USERNAME] === body[AKeysEnum.USERNAME]) {
        this.registerForm.controls[AKeysEnum.USERNAME].setErrors({duplicate: true});
        return true;
      }
      return false;
    });
    if (valid) {
      users.push(body);
      this.localStorageService.setItem('users', users);
      this.router.navigate(['/auth/login']);
    }
  }
}
