import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faAddressBook, faX, faLink } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  userType: string = 'UnAuth';
  userName: string = '';
  cartItems = 0;
  facebookIcon = faAddressBook;
  xIcon = faX;
  linkIcon = faLink;
  constructor(
    private router: Router,
    private product_service: ProductService
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
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
