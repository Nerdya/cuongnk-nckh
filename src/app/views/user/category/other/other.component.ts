import { Component } from '@angular/core';
import {Product} from "../../../../shared/interfaces/common.interface";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {initialProducts} from "../../../../shared/constants/common.const";

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent {
  products!: Product[];
  others: Product[] = [];

  constructor(
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    if (!this.localStorageService.getItem('products')) {
      this.localStorageService.setItem('products', initialProducts);
    }
    this.products = this.localStorageService.getItem('products');
    this.products.forEach(product => {
      if (!['laptop', 'smartphone', 'smartTV', 'headphone'].includes(product.category)) {
        this.others.push(product);
      }
    });
  }
}
