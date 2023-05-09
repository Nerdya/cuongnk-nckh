import { Component } from '@angular/core';
import {Product} from "../../../../shared/interfaces/common.interface";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {initialProducts} from "../../../../shared/constants/common.const";

@Component({
  selector: 'app-headphone',
  templateUrl: './headphone.component.html',
  styleUrls: ['./headphone.component.scss']
})
export class HeadphoneComponent {
  products!: Product[];
  headphones: Product[] = [];

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
      if (product.category === 'headphone') {
        this.headphones.push(product);
      }
    });
  }
}
