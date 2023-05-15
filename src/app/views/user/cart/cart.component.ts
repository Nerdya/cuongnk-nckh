import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SessionStorageService} from "../../../services/session-storage.service";
import {CartItem} from "../../../shared/interfaces/common.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sessionStorageService: SessionStorageService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getCartItems();
  }

  initForm(): void {
    this.cartForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  get itemsFormArray(): FormArray {
    return this.cartForm.get('items') as FormArray;
  }

  getCartItems() {
    const cartItems = this.sessionStorageService.getItem('cartItems') ?? [];
    cartItems.forEach((item: CartItem) => {
      this.itemsFormArray.push(this.createCartItem());
    });
  }

  createCartItem(): FormGroup {
    return this.fb.group({
      name: ['Default Name'],
      price: ['Default Price'],
      quantity: ['Default Quantity']
    });
  }

  submit(): void {
  }
}
