import {Component, OnInit} from '@angular/core';
import {Product, Table} from "../../../shared/interfaces/common.interface";
import {UserService} from "../../../services/user.service";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products!: Product[];
  laptops: Product[] = [];
  smartphones: Product[] = [];
  smartTVs: Product[] = [];
  headphones: Product[] = [];
  others: Product[] = [];
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
          switch (product.category) {
            case 'laptop':
              this.laptops.push(product);
              break;
            case 'smartphone':
              this.smartphones.push(product);
              break;
            case 'smartTV':
              this.smartTVs.push(product);
              break;
            case 'headphone':
              this.headphones.push(product);
              break;
            default:
              this.others.push(product);
          }
        });
        this.loading = false;
      }
    });
  }
}
