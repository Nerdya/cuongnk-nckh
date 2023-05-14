import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MultiDataControl} from "../../../shared/interfaces/multi-data-control.interface";
import {UKeysEnum} from "../u-keys.enum";
import {DataTypeEnum} from "../../../shared/enums/data-type.enum";
import {SessionStorageService} from "../../../services/session-storage.service";
import {Feedback, Table} from "../../../shared/interfaces/common.interface";
import {UserService} from "../../../services/user.service";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedbackForm!: FormGroup;
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
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
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
    this.feedbackForm = this.fb.group(formDataObj);
  }

  submit(): void {
    this.loading = true;
    this.multiDataControls.forEach(element => {
      if (this.feedbackForm.controls[element.code].errors && !element.state.touched) {
        element.state = Object.assign({}, element.state, {touched: true});
      }
    });
    if (!this.feedbackForm.valid) {
      return;
    }
    let body = this.feedbackForm.value;

    // get feedbacks table
    let feedbacksTable: Table;
    this.userService.getFeedbacksTable().subscribe({
      next: (res: Table) => {
        if (res) {
          feedbacksTable = res;
        }
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
      complete: () => {
        let feedbacks: Feedback[] = feedbacksTable.rows;
        body[UKeysEnum.ID] = (feedbacks.length + 1).toString();
        // update feedbacks table
        feedbacksTable.rows.push(body);
        this.userService.updateFeedbacksTable(feedbacksTable).subscribe({
          next: () => {
            this.notifyService.success('Gửi phản hồi thành công!');
            this.feedbackForm.controls[UKeysEnum.EMAIL].patchValue(null);
            this.feedbackForm.controls[UKeysEnum.CONTENT].patchValue(null);
            this.feedbackForm.controls[UKeysEnum.EMAIL].setErrors(null);
            this.feedbackForm.controls[UKeysEnum.CONTENT].setErrors(null);
            this.loading = false;
          }
        });
      }
    });
  }
}
