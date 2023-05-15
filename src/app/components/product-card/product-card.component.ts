import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CartItem, Product} from "../../shared/interfaces/common.interface";
import {SessionStorageService} from "../../services/session-storage.service";
import {NotifyService} from "../../services/notify.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() cardTitle = 'Card title';
  @Input() extra = '';
  @Input() extraLink = '/';
  @Input() list!: Product[];

  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private sessionStorageService: SessionStorageService,
  ) {
  }

  detail(id: number) {
    this.router.navigate(['/product/' + id]);
  }

  addToCart(item: Product) {
    let cartItems = this.sessionStorageService.getItem('cartItems') ?? [];
    const exist = cartItems.some((cartItem: CartItem) => {
      if (cartItem.id === item.id) {
        cartItem.amount++;
        return true;
      }
      return false;
    });
    if (!exist) {
      const cartItem: CartItem = {
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        amount: 1,
      };
      cartItems.push(cartItem);
    }
    this.sessionStorageService.setItem('cartItems', cartItems);
    this.notifyService.success('Đã thêm sản phẩm vào giỏ hàng');
  }
}
