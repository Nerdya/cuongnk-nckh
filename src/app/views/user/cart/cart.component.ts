import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MultiDataControl} from "../../../shared/interfaces/multi-data-control.interface";
import {UKeysEnum} from "../u-keys.enum";
import {DataTypeEnum} from "../../../shared/enums/data-type.enum";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartForm!: FormGroup;
  multiDataControls: MultiDataControl[] = [
    {
      code: UKeysEnum.EMAIL,
      value: null,
      validators: [Validators.required, Validators.email, Validators.maxLength(255)],
      options: {
        name: 'Email',
        control: new FormControl(),
        dataType: DataTypeEnum.STRING,
      },
      state: {},
    },
    {
      code: UKeysEnum.CONTENT,
      value: null,
      validators: [Validators.required],
      options: {
        name: 'Nội dung phản hồi',
        control: new FormControl(),
        dataType: DataTypeEnum.TEXTAREA,
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
    this.cartForm = this.fb.group(formDataObj);
  }

  submit(): void {
    this.multiDataControls.forEach(element => {
      if (this.cartForm.controls[element.code].errors && !element.state.touched) {
        element.state = Object.assign({}, element.state, {touched: true});
      }
    });
    if (!this.cartForm.valid) {
      return;
    }
    let body = this.cartForm.value;
    let feedbacks: any[] = this.localStorageService.getItem('feedbacks') ?? [];
    feedbacks.push(body);
    this.localStorageService.setItem('feedbacks', feedbacks);
    alert('Gửi phản hồi thành công!');
    this.cartForm.controls[UKeysEnum.EMAIL].patchValue(null);
    this.cartForm.controls[UKeysEnum.CONTENT].patchValue(null);
    this.cartForm.controls[UKeysEnum.EMAIL].setErrors(null);
    this.cartForm.controls[UKeysEnum.CONTENT].setErrors(null);
  }
}
