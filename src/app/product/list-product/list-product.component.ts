import { Component } from '@angular/core';
import { Product } from 'src/app/data-type/product';
import { ProductService } from 'src/app/service/product/product.service';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent {
  products: undefined | Product[];
  product: undefined | Product;
  message: undefined | string;
  errorMessage: undefined | string;
  delete = faTrash;
  edit = faEdit;
  save = faSave;
  constructor(private product_service: ProductService) {}
  ngOnInit(): void {
    this.listProducts();
  }
  listProducts() {
    this.product_service.getProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }
  saveProduct(data: Product): void {
    if (data.id > 0) {
      this.product_service.updateProduct(data).subscribe(
        (data) => {
          this.message = 'Product Update Successfully!';
          this.listProducts();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    } else {
      this.product_service.addProduct(data).subscribe(
        (data) => {
          this.message = 'Product Save Successfully!';
          this.listProducts();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    }
    setTimeout(() => {
      this.message = undefined;
      this.errorMessage = undefined;
    }, 2000);
  }
  editProduct(id: number) {
    this.product_service.getProductById(id).subscribe((response) => {
      console.log(response);
      this.product = response;
    });
  }
  deleteProduct(id: number) {
    this.product_service.deleteProductById(id).subscribe((response) => {
      if (response) {
        this.message = 'Product Delete Successfully!';
        this.listProducts();
      }
    });
    setTimeout(() => {
      this.message = undefined;
    }, 2000);
  }
}
