import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    // Check if the value is a valid number
    if (isNaN(value)) {
      return '';
    }

    // Convert the number to a string and add the thousands separator
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Add the currency symbol
    return formattedValue + ' đ';
  }
}
