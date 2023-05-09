import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from "../../../../services/local-storage.service";
import {CartItem, Product} from "../../../../shared/interfaces/common.interface";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number = 0;
  product: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    category: '',
    description: ''
  }

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    const products = this.localStorageService.getItem('products') ?? [];
    products.some((product: Product) => {
      if (product.id === this.id) {
        this.product = product;
      }
    });
  }

  addToCart(id: number) {
    let cartItems = this.localStorageService.getItem('cartItems') ?? [];
    const exist = cartItems.some((cartItem: CartItem) => {
      if (cartItem.id === id) {
        cartItem.amount++;
        return true;
      }
      return false;
    });
    if (!exist) {
      const cartItem: CartItem = {
        id: this.product.id,
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        amount: 1,
      };
      cartItems.push(cartItem);
    }
    this.localStorageService.setItem('cartItems', cartItems);
  }
}
