import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from 'src/app/data-type/order';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  order_details: any | OrderDetail[];
  constructor(
    private product_service: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('query');
    id && this.listOrderDetails(Number(id));
  }
  listOrderDetails(id: number) {
    this.product_service.getOrderDetail(id).subscribe((response) => {
      console.log(response);
      this.order_details = response;
    });
  }
}
