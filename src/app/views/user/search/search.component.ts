import {Component, OnInit} from '@angular/core';
import {Product, Table} from "../../../shared/interfaces/common.interface";
import {UserService} from "../../../services/user.service";
import {NotifyService} from "../../../services/notify.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchString = '';
  products!: Product[];
  searches: Product[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notifyService: NotifyService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.searchString = params.get('key') ?? '';
    });
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
          if (product.name.includes(this.searchString)) {
            this.searches.push(product);
          }
        });
        this.loading = false;
      }
    });
  }
}
