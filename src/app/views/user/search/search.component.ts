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
  private _searchString: string = '';
  products!: Product[];
  results: Product[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notifyService: NotifyService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.searchString = params['key'] ?? '';
    });
  }

  set searchString(value: string) {
    if (this._searchString !== value) {
      this._searchString = value;
      // Perform any other actions based on the value change
      this.getSearchResults();
    }
  }

  get searchString(): string {
    return this._searchString;
  }

  ngOnInit() {
    this.getSearchResults();
  }

  getSearchResults() {
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
        this.results = [];
        this.products.forEach(product => {
          if (product.name.includes(this.searchString)) {
            this.results.push(product);
          }
        });
        this.loading = false;
      }
    });
  }
}
