import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Dashbaord } from 'src/app/data-type/dashboard';
import { Order, OrderDetail } from 'src/app/data-type/order';
import { Cart, Product } from 'src/app/data-type/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<Product[] | []>();
  constructor(private http: HttpClient, private route: Router) {}
  getProducts() {
    return this.http.get<Product[]>(
      'http://localhost/EcoApi/api/list-products'
    );
  }
  addProduct(data: Product) {
    return this.http.post('http://localhost/EcoApi/api/add-product', data);
  }
  getProductById(id: number) {
    return this.http.get<Product>(
      'http://localhost/EcoApi/api/edit-product/' + id
    );
  }
  updateProduct(data: Product) {
    return this.http.post('http://localhost/EcoApi/api/update-product', data);
  }
  deleteProductById(id: number) {
    return this.http.get('http://localhost/EcoApi/api/delete-product/' + id);
  }
  getProductBySlug(slug: string) {
    return this.http.get<Product>(
      'http://localhost/EcoApi/api/get-product-slug/' + slug
    );
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
    return this.http.post('http://localhost/EcoApi/api/add-cart', data);
  }

  loginRemoveToCart(
    productId: number | undefined,
    user_id: number | undefined
  ) {
    return this.http.get(
      'http://localhost/EcoApi/api/delete-cart/' + productId + '/' + user_id
    );
  }
  getCartByUserId(user_id: number | undefined) {
    return this.http
      .get<Cart[]>('http://localhost/EcoApi/api/list-cart/' + user_id, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  getCurrentCartByUserId(userId: number | undefined) {
    return this.http.get<Cart[]>(
      'http://localhost/EcoApi/api/list-cart/' + userId
    );
  }

  placeOrder(data: Order) {
    return this.http.post('http://localhost/EcoApi/api/place-order', data);
  }
  allOrders() {
    return this.http.get<Order[]>('http://localhost/EcoApi/api/orders');
  }
  Orders(user_id: number | undefined) {
    return this.http.get<Order[]>(
      'http://localhost/EcoApi/api/list-order/' + user_id
    );
  }
  deleteOrderById(id: number) {
    return this.http.get('http://localhost/EcoApi/api/delete-order/' + id);
  }
  statusOrder(id: number | undefined, status_id: number | undefined) {
    return this.http.get(
      'http://localhost/EcoApi/api/status-order/' + id + '/' + status_id
    );
  }
  getOrderDetail(id: number) {
    return this.http.get<OrderDetail>(
      'http://localhost/EcoApi/api/order-detail/' + id
    );
  }

  getDasboard() {
    return this.http.get<Dashbaord>('http://localhost/EcoApi/api/admin-dashboard');
  }
}
