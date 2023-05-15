import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CartItem, Product, Table} from "../../../../shared/interfaces/common.interface";
import {UserService} from "../../../../services/user.service";
import {NotifyService} from "../../../../services/notify.service";
import {SessionStorageService} from "../../../../services/session-storage.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number = 0;
  products!: Product[];
  product: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    category: '',
    description: ''
  }
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notifyService: NotifyService,
    private sessionStorageService: SessionStorageService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    this.loading = true;

    // get products table
    let productsTable: Table;
    this.userService.getProductsTable().subscribe({
      next: (res: Table) => {
        if (res) {
          productsTable = res;
        }
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
      complete: () => {
        this.products = productsTable.rows;
        if (!this.products.length) {
          this.notifyService.error('Không có sản phẩm trong hệ thống!');
          this.loading = false;
          return;
        }
        this.products.some((product: Product) => {
          if (product.id === this.id) {
            this.product = product;
            return true;
          }
          return false;
        });
        this.loading = false;
      }
    });
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
