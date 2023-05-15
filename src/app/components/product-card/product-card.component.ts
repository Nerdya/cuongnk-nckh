import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from "../../shared/interfaces/common.interface";

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
  ) {
  }

  detail(id: number) {
    this.router.navigate(['/product/' + id]);
  }

  addToCart(id: number) {
    alert('addToCart ' + id);
  }
}
