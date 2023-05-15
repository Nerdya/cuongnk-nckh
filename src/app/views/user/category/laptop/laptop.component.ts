import {Component} from '@angular/core';
import {Product, Table} from "../../../../shared/interfaces/common.interface";
import {UserService} from "../../../../services/user.service";
import {NotifyService} from "../../../../services/notify.service";

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.scss']
})
export class LaptopComponent {
  products!: Product[];
  laptops: Product[] = [];
  loading = true;

  constructor(
    private userService: UserService,
    private notifyService: NotifyService,
  ) {
  }

  ngOnInit() {
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
        this.products.forEach(product => {
          if (product.category === 'laptop') {
            this.laptops.push(product);
          }
        });
        this.loading = false;
      }
    });
  }
}
