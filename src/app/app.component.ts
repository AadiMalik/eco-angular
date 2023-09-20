import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from './service/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private product_service: ProductService
  ) {}
  title = 'adminSide';
  ngOnInit(): void {
    if (localStorage.getItem('auth-user')) {
      var role = localStorage.getItem('auth-role');
      let user = localStorage.getItem('auth-user');
      let userData = user && JSON.parse(user);
      let userId = user && JSON.parse(user).id;
      if (userData && role == '2') {
        this.product_service.getCartByUserId(userId);
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
