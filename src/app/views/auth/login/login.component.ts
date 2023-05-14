import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {SessionStorageService} from "../../../services/session-storage.service";
import {Router} from "@angular/router";
import {AuKeysEnum} from "../au-keys.enum";
import {MultiDataControl} from "../../../shared/interfaces/multi-data-control.interface";
import {DataTypeEnum} from "../../../shared/enums/data-type.enum";
import {Table, User} from "../../../shared/interfaces/common.interface";
import {AuthService} from "../../../services/auth.service";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  multiDataControls: MultiDataControl[] = [
    {
      code: AuKeysEnum.USERNAME,
      value: null,
      validators: [Validators.required, Validators.maxLength(255)],
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
      code: AuKeysEnum.PASSWORD,
      value: null,
      validators: [Validators.required, Validators.maxLength(255)],
      options: {
        name: 'Mật khẩu',
        placeholder: 'Mật khẩu',
        control: new FormControl(),
        dataType: DataTypeEnum.PASSWORD,
        prefixIcon: 'lock',
        showPassword: false,
      },
      state: {},
    },
  ];
  isRequired = (validators: ValidationErrors[]) => {
    return validators.includes(Validators.required);
  }
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
    });
    this.loginForm = this.fb.group(formDataObj);
  }

  submit(): void {
    this.loading = true;
    this.multiDataControls.forEach(element => {
      if (this.loginForm.controls[element.code].errors && !element.state.touched) {
        element.state = Object.assign({}, element.state, {touched: true});
      }
      if (!element.state.touched) {
        element.state.touched = true;
      }
    });
    if (!this.loginForm.valid) {
      this.loading = false;
      return;
    }
    const formValue = this.loginForm.value;
    let body: User = {
      [AuKeysEnum.USERNAME]: formValue[AuKeysEnum.USERNAME],
      [AuKeysEnum.PASSWORD]: formValue[AuKeysEnum.PASSWORD],
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
        if (!users.length) {
          this.notifyService.error('Không có người dùng trong hệ thống!');
          return;
        }
        // check body validity
        let invalid = true;
        let usernameFound = users.some((user: any) => {
          if (user[AuKeysEnum.USERNAME] === body[AuKeysEnum.USERNAME]) {
            if (user[AuKeysEnum.PASSWORD] === body[AuKeysEnum.PASSWORD]) {
              this.sessionStorageService.setItem('currentUser', user);
              invalid = false;
            } else {
              this.notifyService.error('Mật khẩu không đúng!');
              this.loginForm.controls[AuKeysEnum.PASSWORD].setErrors({wrongPassword: true});
            }
            return true;
          }
          return false;
        });
        if (!usernameFound) {
          this.notifyService.error('Tên tài khoản không tồn tại!');
          this.loginForm.controls[AuKeysEnum.USERNAME].setErrors({notFound: true});
        }
        if (invalid) {
          this.loading = false;
        } else {
          const currentUser = this.sessionStorageService.getItem('currentUser');
          this.notifyService.success('Đăng nhập thành công!');
          switch (currentUser.role) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            default:
              this.router.navigate(['/']);
          }
          this.loading = false;
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.multiDataControls[1].options.showPassword = !this.multiDataControls[1].options.showPassword;
  }
}
