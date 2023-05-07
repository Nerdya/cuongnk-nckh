import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../../services/local-storage.service";
import {Product} from "../../../shared/interfaces/common.interface";
import {initialProducts} from "../../../shared/constants/common.const";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products!: Product[];
  laptops: Product[] = [];
  smartphones: Product[] = [];
  tvs: Product[] = [];
  headphones: Product[] = [];
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
      switch (product.category) {
        case 'laptop':
          this.laptops.push(product);
          break;
        case 'smartphone':
          this.smartphones.push(product);
          break;
        case 'tv':
          this.tvs.push(product);
          break;
        case 'headphone':
          this.headphones.push(product);
          break;
        default:
          this.others.push(product);
      }
    });
  }
}
