import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/data-type/order';
import { ProductService } from 'src/app/service/product/product.service';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent {
  orders: any | Order[];
  message: undefined | string;
  delete = faTrash;
  showIcon = faEye;
  defaultSelect = 0;
  constructor(
    private product_service: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.listOrders();
  }
  listOrders() {
    this.product_service.allOrders().subscribe((response) => {
      console.log(response);
      this.orders = response;
    });
  }
  deleteOrder(id: number) {
    this.product_service.deleteOrderById(id).subscribe((response) => {
      if (response) {
        this.message = 'Order Delete Successfully!';
        this.listOrders();
      }
    });
    setTimeout(() => {
      this.message = undefined;
    }, 2000);
  }
  statusOrder(id: number) {
    let status_id = this.defaultSelect;
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
