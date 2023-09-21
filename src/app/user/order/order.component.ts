import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCancel, faEye } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/data-type/order';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orders: any | Order[];
  message: undefined | string;
  showIcon = faEye;
  cancelIcon = faCancel;
  constructor(
    private product_service: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.listOrders();
  }
  listOrders() {
    let user = localStorage.getItem('auth-user');
    let userId = user && JSON.parse(user).id;
    this.product_service.Orders(userId).subscribe((response) => {
      console.log(response);
      this.orders = response;
    });
  }
  cancelOrder(id: number, status_id: number) {
    this.product_service.statusOrder(id, status_id).subscribe((response) => {
      if (response) {
        this.message = 'Order Status Change Successfully!';
        this.listOrders();
      }
    });
    setTimeout(() => {
      this.message = undefined;
    }, 2000);
  }
}
