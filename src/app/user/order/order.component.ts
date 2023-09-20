import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/data-type/order';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orders: any | Order[];
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
  
}
