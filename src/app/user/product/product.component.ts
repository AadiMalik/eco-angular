import { Component } from '@angular/core';
import { Product } from 'src/app/data-type/product';
import { faEye, faTreeCity, faDollar } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products: undefined | Product[];
  message: undefined | string;
  errorMessage: undefined | string;
  showIcon = faEye;
  categoryIcon = faTreeCity;
  priceIcon = faDollar;
  constructor(
    private product_service: ProductService
  ) {}
  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.product_service.getProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }
}
