import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Signup } from '../data-type/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.auth.reloadAuth();
  }
  Register(data: Signup): void {
    this.auth.userRegister(data);
  }
}
