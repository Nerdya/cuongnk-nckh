import { Component } from '@angular/core';
import {Product} from "../../../../shared/interfaces/common.interface";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {initialProducts} from "../../../../shared/constants/common.const";

@Component({
  selector: 'app-smart-t-v',
  templateUrl: './smart-t-v.component.html',
  styleUrls: ['./smart-t-v.component.scss']
})
export class SmartTVComponent {
  products!: Product[];
  smartTVs: Product[] = [];

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
      if (product.category === 'smartTV') {
        this.smartTVs.push(product);
      }
    });
  }
}
