import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../data-type/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authError: string = '';
  submitted = false;
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.auth.reloadAuth();
  }

  Login(data: Login): void {
    this.auth.userLogin(data);
    this.auth.isLoginError.subscribe((error) => {
      console.log(error);
      if (error) {
        this.authError = 'Email or Password is Wrong!';
      }
    });
  }
}
