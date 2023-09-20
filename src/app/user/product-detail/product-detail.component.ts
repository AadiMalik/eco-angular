import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from 'src/app/data-type/product';
import { ProductService } from 'src/app/service/product/product.service';
import { faEye, faTreeCity, faDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: undefined | Product;
  productQuantity: number = 1;
  showIcon = faEye;
  categoryIcon = faTreeCity;
  priceIcon = faDollar;
  cart: boolean = true;
  constructor(
    private product_service: ProductService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let slug = this.activeRoute.snapshot.paramMap.get('query');
    slug && this.productDetail(slug);
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  productDetail(slug: string) {
    this.product_service.getProductBySlug(slug).subscribe((response) => {
      this.product = response;
      let data = response;
      let cartData = [];
      let cart = localStorage.getItem('localCart');
      cartData = cart && JSON.parse(cart);
      let items = cartData.filter((item: Product) => data.id == item.id);
      if (items.length > 0) {
        this.cart = false;
      } else {
        this.cart = true;
      }
    });

    let user = localStorage.getItem('auth-user');
    if(user){
      let userId = JSON.parse(user).id;
      this.product_service.getCartByUserId(userId);
      this.product_service.cartData.subscribe((result)=>{
       let items= result.filter((item: Product) => slug?.toString() === item.slug?.toString());
       if (items.length > 0) {
         this.cart = false;
       } else {
         this.cart = true;
       }
      });
    }
  }

  AddToCart() {
    if (this.product) {
      this.product.quantity = this.productQuantity;
      var role = localStorage.getItem('auth-role');
      let user = localStorage.getItem('auth-user');
      let userData = user && JSON.parse(user);
      let user_id = user && JSON.parse(user).id;
      if (userData && role == '2') {
        let cartData = {
          ...this.product,
          user_id,
          product_id: this.product.id,
        };
        this.product_service.loginAddToCart(cartData).subscribe((result) => {
          if (result) {
            this.cart = false;
            this.product_service.getCartByUserId(user_id);
          }
        });
      } else {
        this.product_service.aadToCart(this.product);
        this.cart = false;
      }
    }
  }
  removeToCart(id: number | undefined) {
    var role = localStorage.getItem('auth-role');
    let user = localStorage.getItem('auth-user');
    let userData = user && JSON.parse(user);
    let userId = user && JSON.parse(user).id;
    if (userData && role == '2') {
      this.product_service.loginRemoveToCart(id, userId).subscribe((result) => {
        if (result) {
          this.cart = true;
          alert('Product remove from cart successfully!');
        }
      });
    } else {
      this.product_service.removeToCart(id);
      this.cart = true;
    }
  }
}
