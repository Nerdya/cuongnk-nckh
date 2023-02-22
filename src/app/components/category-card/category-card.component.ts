import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() cardTitle = 'Card title';
  @Input() extra = 'More';
  @Input() extraLink = '/';
  @Input() list = [
    {
      id: '1',
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      id: '2',
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      id: '3',
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      id: '4',
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      id: '5',
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      id: '6',
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      id: '7',
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      id: '8',
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
  ];

  constructor(
    private router: Router,
  ) {}

  detail(id: string) {
    this.router.navigate(['/user/product/' + id]);
  }

  addToCart(id: string) {
    alert('addToCart ' + id);
  }
}
