import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Signup } from './data-type/signup';
import { Login } from './data-type/login';
import { Cart, Product } from './data-type/product';
import { ProductService } from './service/product/product.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  heading = environment.title;
  apiURL = environment.apiURL;
  isLogin = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private product_service: ProductService
  ) {}
  userRegister(data: Signup) {
    this.http
      .post(this.apiURL + 'register', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        this.isLogin.next(true);
        localStorage.setItem('auth-user', JSON.stringify(result.body));
        this.router.navigate(['auth/login']);
        return result;
      });
  }
  userLogin(data: Login) {
    this.http
      .post(this.apiURL + 'login', data, { observe: 'response' })
      .subscribe((result: any) => {
        if (result.body.success == true) {
          this.isLogin.next(true);
          console.log(this.isLogin);
          localStorage.setItem('auth-user', JSON.stringify(result.body.data));
          localStorage.setItem(
            'auth-role',
            JSON.stringify(result.body.data.role)
          );
          if (result.body.data.role == '2') {
            this.router.navigate(['/']);
            this.localCartToDbCart();
          } else {
            this.router.navigate(['admin/home']);
          }
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
  userLogout() {
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-role');
    this.router.navigate(['auth/login']);
    this.product_service.cartData.emit([]);
  }
  reloadAuth() {
    console.log(localStorage.getItem('auth-user')?.length != 0);
    if (localStorage.getItem('auth-user')?.length!=0) {
      return true;
    } else {
      return false;
    }
  }
  redirectLogin(){
    this.router.navigate(['auth/login']);
  }

  localCartToDbCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('auth-user');
    let user_id = user && JSON.parse(user).id;
    if (data) {
      let cartData: Product[] = JSON.parse(data);

      cartData.forEach((product: Product, index) => {
        let singleCart: Cart = {
          ...product,
          product_id: product.id,
          user_id,
        };
        setTimeout(() => {
          this.product_service
            .loginAddToCart(singleCart)
            .subscribe((result) => {
              if (result) {
                console.log('product store in cart');
              }
            });
        }, 500);

        if (cartData.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
    setTimeout(() => {
      this.product_service.getCartByUserId(user_id);
    }, 500);
  }
}
