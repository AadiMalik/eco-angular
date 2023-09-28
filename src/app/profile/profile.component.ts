import { Component } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { User } from '../data-type/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required,Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)]),
  });
  user: undefined | User;
  message: undefined | string;
  errorMessage: undefined | string;
  save = faSave;
  constructor(private user_service: UserService) {}
  ngOnInit(): void {
    this.getUserbyId();
  }
  updateProfile(id: number | undefined): void {
    let obj = {
      id: id,
      name: this.profileForm.get('name')?.value,
      password: this.profileForm.get('password')?.value,
    };
    if (obj && obj.id != undefined) {
      this.user_service.updateUser(obj).subscribe({
        next: (data) => {
          this.message = 'Profile Updated Successfully!';
          this.getUserbyId();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
    }
    setTimeout(() => {
      this.message = undefined;
      this.errorMessage = undefined;
    }, 2000);
  }
  getUserbyId() {
    let user = localStorage.getItem('auth-user');
    let userId = user && JSON.parse(user).id;
      this.user_service.getUserById(userId).subscribe((response) => {
        this.user = response;
      });
  }
}
