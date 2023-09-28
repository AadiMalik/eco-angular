import { Component } from '@angular/core';
import { Product } from 'src/app/data-type/product';
import { ProductService } from 'src/app/service/product/product.service';
import { faTrash, faEdit, faSave, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent {
  productForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  products: undefined | Product[];
  product: undefined | Product;
  message: undefined | string;
  errorMessage: undefined | string;
  delete = faTrash;
  edit = faEdit;
  save = faSave;
  reset = faRefresh;
  button = 'Save';
  heading = 'Create Product';
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
  saveProduct(id: number | undefined): void {
    let obj = {
      id: id,
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      category: this.productForm.get('category')?.value,
      color: this.productForm.get('color')?.value,
      url: this.productForm.get('url')?.value,
      description: this.productForm.get('description')?.value,
    };
    if (obj && obj.id != undefined) {
      this.product_service.updateProduct(obj).subscribe(
        (data) => {
          this.message = 'Product Update Successfully!';
          this.listProducts();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    } else {
      this.product_service.addProduct(obj).subscribe(
        (data) => {
          this.message = 'Product Save Successfully!';
          this.listProducts();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    }
    this.resetForm();
    setTimeout(() => {
      this.message = undefined;
      this.errorMessage = undefined;
    }, 2000);
  }
  editProduct(id: number) {
    this.product_service.getProductById(id).subscribe((response) => {
      console.log(response);
      this.product = response;
      this.heading = 'Update Product';
      this.button = 'Update';
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
  resetForm() {
    this.heading = 'Create Product';
    this.button = 'Save';
    this.productForm.reset(this.productForm.value);
  }
}
