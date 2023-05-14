import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {DataTypeEnum} from "../../../shared/enums/data-type.enum";
import {MultiDataControl} from "../../../shared/interfaces/multi-data-control.interface";
import {AuKeysEnum} from "../au-keys.enum";
import {SessionStorageService} from "../../../services/session-storage.service";
import {Router} from "@angular/router";
import {Table, User} from "../../../shared/interfaces/common.interface";
import {AuthService} from "../../../services/auth.service";
import {NotifyService} from "../../../services/notify.service";

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
    } else if (control.value !== this.registerForm.controls[AuKeysEnum.PASSWORD].value) {
      return {confirm: true};
    }
    return {};
  };
  multiDataControls: MultiDataControl[] = [
    {
      code: AuKeysEnum.USERNAME,
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
      code: AuKeysEnum.PASSWORD,
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
      code: AuKeysEnum.CHECK_PASSWORD,
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
      code: AuKeysEnum.FULL_NAME,
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
      code: AuKeysEnum.EMAIL,
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
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private notifyService: NotifyService,
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

      element.state = {
        disabled: false,
        touched: false,
      }
    });
    this.registerForm = this.fb.group(formDataObj);
  }

  submitForm(): void {
    this.loading = true;
    this.multiDataControls.forEach(element => {
      if (this.registerForm.controls[element.code].errors && !element.state.touched) {
        element.state = Object.assign({}, element.state, {touched: true});
      }
      if (!element.state.touched) {
        element.state.touched = true;
      }
    });
    if (!this.registerForm.valid) {
      this.loading = false;
      return;
    }
    const formValue = this.registerForm.value;
    let body: User = {
      [AuKeysEnum.USERNAME]: formValue[AuKeysEnum.USERNAME],
      [AuKeysEnum.PASSWORD]: formValue[AuKeysEnum.PASSWORD],
      [AuKeysEnum.FULL_NAME]: formValue[AuKeysEnum.FULL_NAME],
      [AuKeysEnum.EMAIL]: formValue[AuKeysEnum.EMAIL],
      [AuKeysEnum.PHONE_NUMBER]: '',
    }

    // get users table
    let usersTable: Table;
    this.authService.getUsersTable().subscribe({
      next: (res: Table) => {
        if (res) {
          usersTable = res;
        }
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
      complete: () => {
        let users: User[] = usersTable.rows;
        // check body validity
        let invalid = users.some((user: any) => {
          return user[AuKeysEnum.USERNAME] === body[AuKeysEnum.USERNAME];
        });
        if (invalid) {
          this.notifyService.error('Tên tài khoản đã tồn tại!');
          this.registerForm.controls[AuKeysEnum.USERNAME].setErrors({duplicate: true});
          this.loading = false;
        } else {
          body[AuKeysEnum.ID] = (users.length + 1).toString();
          // update users table
          usersTable.rows.push(body);
          this.authService.updateUsersTable(usersTable).subscribe({
            next: () => {
              this.notifyService.success('Đăng ký tài khoản thành công!');
              this.router.navigate(['/auth/login']);
              this.loading = false;
            }
          });
        }
      }
    });
  }
}
