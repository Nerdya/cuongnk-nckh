import { Component } from '@angular/core';
import {Product} from "../../../../shared/interfaces/common.interface";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {initialProducts} from "../../../../shared/constants/common.const";

@Component({
  selector: 'app-smartphone',
  templateUrl: './smartphone.component.html',
  styleUrls: ['./smartphone.component.scss']
})
export class SmartphoneComponent {
  products!: Product[];
  smartphones: Product[] = [];

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
      if (product.category === 'smartphone') {
        this.smartphones.push(product);
      }
    });
  }
}
