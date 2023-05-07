import {FormControl, ValidatorFn} from "@angular/forms";
import {DataTypeEnum} from "../enums/data-type.enum";

export interface SelectListItem {
    value: any,
    label: string,
    id?: number,
    disabled?: boolean,
}

export interface MultiDataControlOptions {
    name: string,
    placeholder?: string,
    control: FormControl,
    dataType: DataTypeEnum,
    suffixIcon?: string, // STRING
    rows?: number, // TEXTAREA
    hasOptionAll?: boolean, // SELECT_SINGLE
    maxTagCount?: number, // SELECT_MULTIPLE
    initialChange?: boolean, // SELECT_MULTIPLE
    initialList?: SelectListItem[], // SELECT_SINGLE, SELECT_MULTIPLE
    list?: SelectListItem[], // SELECT_SINGLE, SELECT_MULTIPLE
    disabledDate?: (d: Date) => boolean, // DATE
    cssClasses?: string,
}

export interface MultiDataControlState {
    disabled?: boolean,
    touched?: boolean,
}

export interface MultiDataControl {
    code: string,
    value: any,
    validators: ValidatorFn[],
    options: MultiDataControlOptions,
    state: MultiDataControlState,
}
