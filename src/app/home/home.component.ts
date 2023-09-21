import { Component } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { Dashbaord } from '../data-type/dashboard';
import { Order } from '../data-type/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  dashboard: Dashbaord | undefined;
  orders: Order[] | undefined;
  constructor(private product_service: ProductService) {}
  ngOnInit(): void {
    this.Dashboard();
  }
  Dashboard() {
    this.product_service.getDasboard().subscribe((response) => {
      console.log(response);
      this.dashboard = response;
      this.orders=response.total_orders;
    });
  }
}
