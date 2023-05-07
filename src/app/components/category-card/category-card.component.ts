import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from "../../shared/interfaces/common.interface";

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() cardTitle = 'Card title';
  @Input() extra = 'More';
  @Input() extraLink = '/';
  @Input() list!: Product[];

  constructor(
    private router: Router,
  ) {
  }

  detail(id: string) {
    this.router.navigate(['/product/' + id]);
  }

  addToCart(id: string) {
    alert('addToCart ' + id);
  }
}
