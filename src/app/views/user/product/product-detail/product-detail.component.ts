import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  private _id: number = 0;
  products!: Product[];
  otherProducts: Product[] = [];
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
    private router: Router,
    private userService: UserService,
    private notifyService: NotifyService,
    private sessionStorageService: SessionStorageService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
  }

  set id(value: number) {
    if (this._id !== value) {
      this._id = value;
      // Perform any other actions based on the value change
      this.getProductDetail();
    }
  }

  get id(): number {
    return this._id;
  }

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
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
        this.otherProducts = [];
        let itemCount = 4;
        this.products.some((product: Product) => {
          if (itemCount > 0) {
            if (product.id !== this.id) {
              this.otherProducts.push(product);
              itemCount--;
            }
          } else {
            return true;
          }
          return false;
        });
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
        cartItem.quantity++;
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
        quantity: 1,
      };
      cartItems.push(cartItem);
    }
    this.sessionStorageService.setItem('cartItems', cartItems);
    this.notifyService.success('Đã thêm sản phẩm vào giỏ hàng');
  }

  purchase(item: Product) {
    this.addToCart(item);
    this.router.navigate(['/cart']);
  }
}
