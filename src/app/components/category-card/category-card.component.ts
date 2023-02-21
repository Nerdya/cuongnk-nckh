import { Component, Input } from '@angular/core';

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
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
    {
      name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
      image: '/assets/images/laptop.png',
      price: '17.990.000 đ',
      promotion: '-12.2%',
    },
  ];
}
