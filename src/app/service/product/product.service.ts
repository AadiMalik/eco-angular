import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Dashbaord } from 'src/app/data-type/dashboard';
import { Order, OrderDetail } from 'src/app/data-type/order';
import { Cart, Product } from 'src/app/data-type/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  heading = environment.title;
  apiURL = environment.apiURL;
  cartData = new EventEmitter<Product[] | []>();
  constructor(private http: HttpClient, private route: Router) {}
  getProducts() {
    return this.http.get<Product[]>(this.apiURL + 'list-products');
  }
  addProduct(data: Product) {
    return this.http.post(this.apiURL + 'add-product', data);
  }
  getProductById(id: number) {
    return this.http.get<Product>(this.apiURL + 'edit-product/' + id);
  }
  updateProduct(data: Product) {
    return this.http.post(this.apiURL + 'update-product', data);
  }
  deleteProductById(id: number) {
    return this.http.get(this.apiURL + 'delete-product/' + id);
  }
  getProductBySlug(slug: string) {
    return this.http.get<Product>(this.apiURL + 'get-product-slug/' + slug);
  }

  aadToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      if (cartData.filter((item: Product) => item.id !== data.id)) {
        cartData.push(data);
        localStorage.setItem('localCart', JSON.stringify(cartData));
      }
    }
    this.cartData.emit(cartData);
  }
  removeToCart(productId: number | undefined) {
    let cartData = [];
    let cart = localStorage.getItem('localCart');
    cartData = cart && JSON.parse(cart);
    let items = cartData.filter((item: any) => item.id !== productId);
    localStorage.setItem('localCart', JSON.stringify(items));
    this.cartData.emit(items);
  }

  loginAddToCart(data: Cart) {
    return this.http.post(this.apiURL + 'add-cart', data);
  }

  loginRemoveToCart(
    productId: number | undefined,
    user_id: number | undefined
  ) {
    return this.http.get(this.apiURL + 'delete-cart/' + productId + '/' + user_id);
  }
  getCartByUserId(user_id: number | undefined) {
    return this.http
      .get<Cart[]>(this.apiURL + 'list-cart/' + user_id, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  getCurrentCartByUserId(userId: number | undefined) {
    return this.http.get<Cart[]>(this.apiURL + 'list-cart/' + userId);
  }

  placeOrder(data: Order) {
    return this.http.post(this.apiURL + 'place-order', data);
  }
  allOrders() {
    return this.http.get<Order[]>(this.apiURL + 'orders');
  }
  Orders(user_id: number | undefined) {
    return this.http.get<Order[]>(this.apiURL + 'list-order/' + user_id);
  }
  deleteOrderById(id: number) {
    return this.http.get(this.apiURL + 'delete-order/' + id);
  }
  statusOrder(id: number | undefined, status_id: number | undefined) {
    return this.http.get(this.apiURL + 'status-order/' + id + '/' + status_id);
  }
  getOrderDetail(id: number) {
    return this.http.get<OrderDetail>(this.apiURL + 'order-detail/' + id);
  }

  getDasboard() {
    return this.http.get<Dashbaord>(this.apiURL + 'admin-dashboard');
  }
}
