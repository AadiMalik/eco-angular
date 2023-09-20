import { Component } from '@angular/core';
import { Product } from 'src/app/data-type/product';
import { faEye, faTreeCity, faDollar } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/service/product/product.service';
import { BlogService } from 'src/app/service/blog/blog.service';
import { Blog } from 'src/app/data-type/blog';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent {
  products: undefined | Product[];
  blogs: undefined | Blog[];
  product: undefined | Product;
  message: undefined | string;
  errorMessage: undefined | string;
  showIcon = faEye;
  categoryIcon = faTreeCity;
  priceIcon = faDollar;
  constructor(
    private product_service: ProductService,
    private blog_service: BlogService
  ) {}
  ngOnInit(): void {
    this.listProducts();
    this.listBlogs();
  }
  listProducts() {
    this.product_service.getProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }
  listBlogs() {
    this.blog_service.getBlogs().subscribe((response) => {
      console.log(response);
      this.blogs = response;
    });
  }
}
