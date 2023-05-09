import { Component } from '@angular/core';
import {Product} from "../../../../shared/interfaces/common.interface";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {initialProducts} from "../../../../shared/constants/common.const";

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.scss']
})
export class LaptopComponent {
  products!: Product[];
  laptops: Product[] = [];

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
      if (product.category === 'laptop') {
        this.laptops.push(product);
      }
    });
  }
}
