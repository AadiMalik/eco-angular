import { Component } from '@angular/core';
import { Cart, Summary } from '../data-type/product';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../service/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
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
  constructor(private product_service: ProductService, private router:Router) {}
  ngOnInit(): void {
    this.listCart();
  }
  listCart() {
    let user = localStorage.getItem('auth-user');
    let userId = user && JSON.parse(user).id;
    this.product_service
      .getCurrentCartByUserId(userId)
      .subscribe((response) => {
        this.carts = response;
        let sub_total=0;
        let tax = 0;
        let discount = 0;
        let delivery = 100;
        response.forEach(item => {
          sub_total=sub_total+ this.Total(item.price,item.quantity);
        });
        this.summary.sub_total = sub_total;
        this.summary.tax = tax;
        this.summary.discount = discount;
        this.summary.delivery = delivery;
        this.summary.total = sub_total + tax + delivery;
      });
  }
  removeToCart(id: number | undefined) {
    var role = localStorage.getItem('auth-role');
    let user = localStorage.getItem('auth-user');
    let userData = user && JSON.parse(user);
    let userId = user && JSON.parse(user).id;
    if (userData && role == '2') {
      this.product_service.loginRemoveToCart(id, userId).subscribe((result) => {
        if (result) {
          alert('Product remove from cart successfully!');
          this.listCart();
        }
      });
    } else {
      this.product_service.removeToCart(id);
    }
  }
  Total(price: any, quantity: any) {
    return Number(price) * Number(quantity);
  }

  checkout(){
    this.router.navigate(['user/checkout']);
  }
}
