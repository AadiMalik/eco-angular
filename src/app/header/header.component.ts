import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUser,
  faArrowCircleDown,
  faLock,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userType: string = 'UnAuth';
  userName: string = '';
  cartItems = 0;
  userIcon = faUser;
  arrowIcon = faArrowCircleDown;
  lockIcon = faLock;
  unlockIcon = faUnlock;
  constructor(private route: Router, private product_service: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        var role = localStorage.getItem('auth-role');
        let user = localStorage.getItem('auth-user');
        let userData = user && JSON.parse(user);
        if (role == '1') {
          this.userType = 'Admin';
          this.userName = userData.name;
        } else if (role == '2') {
          this.userType = 'User';
          this.userName = userData.name;
          
        } else {
          this.userType = 'UnAuth';
        }
      }
      let cartData = localStorage.getItem('localCart');
      if (cartData) {
        this.cartItems = JSON.parse(cartData).length;
      }
      this.product_service.cartData.subscribe((items) => {
        console.log(items.length);
        this.cartItems = items.length;
      });
    });
  }
}
