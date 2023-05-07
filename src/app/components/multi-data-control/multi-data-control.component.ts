import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DataTypeEnum} from "../../shared/enums/data-type.enum";
import {MultiDataControlOptions, MultiDataControlState} from "../../shared/interfaces/multi-data-control.interface";

@Component({
  selector: 'app-multi-data-control',
  templateUrl: './multi-data-control.component.html',
  styleUrls: ['./multi-data-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiDataControlComponent),
      multi: true
    }
  ]
})
export class MultiDataControlComponent implements ControlValueAccessor, OnInit {
  @Input() options: MultiDataControlOptions = {
    name: '',
    control: new FormControl(),
    dataType: DataTypeEnum.STRING,
  };

  @Input() set state(value: MultiDataControlState) {
    if (value.touched) {
      this.options.control.markAsTouched();
      this.options.control.updateValueAndValidity();
    }
    if (value.disabled) {
      this.options.control.disable();
    } else {
      this.options.control.enable();
    }
  };

  @Output() inputChange = new EventEmitter();
  @Output() dateChange = new EventEmitter();
  @Output() selectMultipleChange = new EventEmitter();

  onChange = () => {
  };

  onTouched = () => {
  };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    // this.options.control.updateValueAndValidity();
  }

  ngOnInit() {
    // Generate placeholder if placeholder is null
    if (!this.options.placeholder) {
      const name = this.options.name.charAt(0).toLowerCase() + this.options.name.slice(1);
      if (this.isDatetime || this.isDate || this.isSelectSingle || this.isSelectMultiple) {
        this.options.placeholder = "Chọn " + name;
      } else {
        this.options.placeholder = "Nhập " + name;
      }
    }
  }

  get isString() {
    return this.options.dataType === DataTypeEnum.STRING;
  }

  get isTextarea() {
    return this.options.dataType === DataTypeEnum.TEXTAREA;
  }

  get isNumber() {
    return this.options.dataType === DataTypeEnum.NUMBER;
  }

  get isPassword() {
    return this.options.dataType === DataTypeEnum.PASSWORD;
  }

  get isDatetime() {
    return this.options.dataType === DataTypeEnum.DATETIME;
  }

  get isDate() {
    return this.options.dataType === DataTypeEnum.DATE;
  }

  get isSelectSingle() {
    return this.options.dataType === DataTypeEnum.SELECT_SINGLE;
  }

  get isSelectMultiple() {
    return this.options.dataType === DataTypeEnum.SELECT_MULTIPLE;
  }

  get getErrorMessage() {
    if (this.options.control.hasError('maxlength')) {
      return this.options.name + ' không vượt quá ' + this.options.control.errors?.['maxlength'].requiredLength + ' ký tự';
    }
    if (this.options.control.hasError('required')) {
      return this.options.name + ' không được bỏ trống';
    }
    if (this.options.control.hasError('pattern')) {
      return this.options.name + ' sai định dạng';
    }
    if (this.options.control.hasError('duplicate')) {
      return this.options.name + ' đã tồn tại';
    }
    if (this.options.control.hasError('arrayLength')) {
      return 'Chỉ được chọn từ 5 đến 10 ' + this.options.name;
    }
    if (this.options.control.hasError('email')) {
      return this.options.name + ' sai định dạng';
    }
    if (this.options.control.hasError('confirm')) {
      return 'Mật khẩu không khớp với mật khẩu xác thực';
    }
    if (this.options.control.hasError('notFound')) {
      return this.options.name + ' không tồn tại';
    }
    if (this.options.control.hasError('wrongPassword')) {
      return this.options.name + ' không đúng';
    }
    return 'Có lỗi xảy ra';
  }

  onInputChange(event: Event) {
    this.inputChange.emit(event);
  }

  onDateChange(event: any) {
    this.dateChange.emit(event);
  }

  onSelectMultipleChange(event: any) {
    this.selectMultipleChange.emit(event);
  }
}
