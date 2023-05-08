import {Component} from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product = {
    id: '1',
    name: 'Laptop ACER Aspire 7 A715-42G-R05G (Ryzen 5 5500U/RAM 8GB/512GB SSD/ Windows 11)',
    image: '/assets/images/acer-aspire-7.webp',
    price: '17.990.000 đ',
    promotion: '-12.2%',
    processor: 'Intel Core i5 - 11400H',
    display: '15.6" IPS (1920 x 1080), 144Hz',
    ram: '1 x 8GB DDR4 3200MHz',
    graphics: 'RTX 3050 4GB GDDR6 / Intel UHD Graphics',
    storage: '512GB SSD M.2 NVMe',
    operatingSystem: 'Windows 11',
    battery: '4 cell 57 Wh Pin liền',
    weight: '2.2kg',
    brand: 'ACER',
    sku: '210901841',
    // "size": "23",
    // "color": [
    //     "vàng",
    //     "đỏ"
    // ],
    // "sound": "ádasdasd",
    // "memory": "adasdasd",
    // "memoryStick": "dfadas",
    // "camera": "ádasd",
    // "insurance": "sdgsg",
    // "connection": "rtewrwr",
    // "category": null,
    // "comments": [],
  }

  constructor() {
  }


}
