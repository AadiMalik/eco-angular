import { Component } from '@angular/core';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../service/product/product.service';
import { Router } from '@angular/router';
import { Cart, Summary } from '../data-type/product';
import { Order } from '../data-type/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  carts: undefined | Cart[];
  delete = faTrash;
  edit = faEdit;
  save = faSave;
  summary: Summary = {
    sub_total: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    total: 0,
  };
  constructor(
    private product_service: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.listCart();
  }
  listCart() {
    let user = localStorage.getItem('auth-user');
    let userId = user && JSON.parse(user).id;
    this.product_service
      .getCurrentCartByUserId(userId)
      .subscribe((response) => {
        console.log(response);
        this.carts = response;
        let sub_total = 0;
        let tax = 0;
        let discount = 0;
        let delivery = 100;
        response.forEach((item) => {
          sub_total = sub_total + this.Total(item.price, item.quantity);
        });
        this.summary.sub_total = sub_total;
        this.summary.tax = tax;
        this.summary.discount = discount;
        this.summary.delivery = delivery;
        this.summary.total = sub_total + tax + delivery;
      });
  }
  Total(price: any, quantity: any) {
    return Number(price) * Number(quantity);
  }
  placeOrder(data:Order) {
     let user = localStorage.getItem('auth-user');
     let userId = user && JSON.parse(user).id;
     if(this.summary.total){
      let orderData: Order = {
        ...data,
        sub_total: this.summary.sub_total,
        tax: this.summary.tax,
        delivery: this.summary.delivery,
        discount: this.summary.discount,
        total: this.summary.total,
        user_id: userId,
      };
     this.product_service.placeOrder(orderData).subscribe((result)=>{
      if(result){
        this.router.navigate(['user/orders']);
      }
     });
     }
  }
}
