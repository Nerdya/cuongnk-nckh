import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';

import {CategoryCardComponent} from '../components/category-card/category-card.component';
import {MultiDataControlComponent} from "../components/multi-data-control/multi-data-control.component";

import {CurrencyFormatPipe} from "./pipes/currency-format.pipe";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSelectModule,
    NzCardModule,
    NzDatePickerModule,
    NzDropDownModule,
  ],
  declarations: [
    CategoryCardComponent,
    MultiDataControlComponent,

    CurrencyFormatPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSelectModule,
    NzCardModule,
    NzDatePickerModule,
    NzDropDownModule,

    CategoryCardComponent,
    MultiDataControlComponent,

    CurrencyFormatPipe,
  ]
})
export class SharedModule {
}
