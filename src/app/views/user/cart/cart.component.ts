import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SessionStorageService} from "../../../services/session-storage.service";
import {CartItem} from "../../../shared/interfaces/common.interface";
import {UserService} from "../../../services/user.service";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private _totalValue: number = 0;
  discount: number = 0;
  totalPayment: number = 0;
  cartForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notifyService: NotifyService,
    private sessionStorageService: SessionStorageService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  set totalValue(value: number) {
    if (this._totalValue !== value) {
      this._totalValue = value;
      // Perform any other actions based on the value change
    }
  }

  get totalValue(): number {
    return this._totalValue;
  }

  ngOnInit(): void {
    this.initForm();
    this.getCartItems();
    this.calculateTotalValue();
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
      this.itemsFormArray.push(this.initItemFormGroup(item));
    });
  }

  initItemFormGroup(item: CartItem): FormGroup {
    return this.fb.group({
      id: [item.id],
      name: [item.name],
      image: [item.image],
      price: [item.price],
      quantity: [item.quantity]
    });
  }

  calculateTotalValue() {
    let total = 0;
    const cartItems = this.sessionStorageService.getItem('cartItems') ?? [];
    cartItems.forEach((item: CartItem) => {
      total += (item.price * item.quantity);
    });
    this.totalValue = total;
    this.discount = (this.totalValue / 100);
    this.totalPayment = this.totalValue - this.discount;
  }

  subtract(id: number) {
    const cartItems = this.sessionStorageService.getItem('cartItems') ?? [];
    const index = this.itemsFormArray.controls.findIndex((control: AbstractControl) => (control as FormGroup).get('id')?.value === id);
    if (index !== -1) {
      let itemFormControlValue: CartItem = this.itemsFormArray.controls[index].value;
      if (itemFormControlValue.quantity >= 1) {
        itemFormControlValue.quantity -= 1;
        this.itemsFormArray.controls[index].patchValue(itemFormControlValue);
        this.cdr.markForCheck();
        let cartItem: CartItem = cartItems[index];
        cartItem.quantity -= 1;
        cartItems[index] = cartItem;
        this.sessionStorageService.setItem('cartItems', cartItems);
        this.calculateTotalValue();
      }
    }
  }

  add(id: number) {
    const cartItems = this.sessionStorageService.getItem('cartItems') ?? [];
    const index = this.itemsFormArray.controls.findIndex((control: AbstractControl) => (control as FormGroup).get('id')?.value === id);
    if (index !== -1) {
      let itemFormControlValue: CartItem = this.itemsFormArray.controls[index].value;
      if (itemFormControlValue.quantity <= 100) {
        itemFormControlValue.quantity += 1;
        this.itemsFormArray.controls[index].patchValue(itemFormControlValue);
        this.cdr.markForCheck();
        let cartItem: CartItem = cartItems[index];
        cartItem.quantity += 1;
        cartItems[index] = cartItem;
        this.sessionStorageService.setItem('cartItems', cartItems);
        this.calculateTotalValue();
      }
    }
  }

  removeFromCart(id: number) {
    const cartItems = this.sessionStorageService.getItem('cartItems') ?? [];
    const index = this.itemsFormArray.controls.findIndex((control: AbstractControl) => (control as FormGroup).get('id')?.value === id);
    if (index !== -1) {
      this.itemsFormArray.removeAt(index);
      cartItems.splice(index, 1);
      this.sessionStorageService.setItem('cartItems', cartItems);
      this.calculateTotalValue();
    }
  }

  submit(): void {
    this.notifyService.success('Thanh toán thành công!');
  }
}
