import { Component } from '@angular/core';
import { User } from '../data-type/user';
import {
  faTrash,
  faEdit,
  faSave,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../service/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  userForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('', Validators.required),
  });

  users: undefined | User[];
  user: undefined | User;
  message: undefined | string;
  errorMessage: undefined | string;
  delete = faTrash;
  edit = faEdit;
  save = faSave;
  reset = faRefresh;
  button = 'Save';
  heading = 'Create User';
  constructor(
    private user_service: UserService,
    private formbuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.userForm.controls['email'].enable();
    this.listUsers();
  }
  listUsers() {
    this.user_service.getUsers().subscribe((response) => {
      console.log(response);
      this.users = response;
    });
  }
  saveUser(id: number | undefined) {
    let obj = {
      id: id,
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      role: this.userForm.get('role')?.value,
    };
    console.log(obj);
    if (obj && obj.id != undefined) {
      this.user_service.updateUser(obj).subscribe(
        (data) => {
          this.message = 'User Update Successfully!';
          this.listUsers();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    } else {
      this.userForm.controls['email'].setValidators([
        Validators.email,
        Validators.required,
      ]);
      this.userForm.controls['email'].updateValueAndValidity();
      this.userForm.controls['password'].setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
      ]);
      this.userForm.controls['password'].updateValueAndValidity();
      this.user_service.addUser(obj).subscribe(
        (data) => {
          this.message = 'User Save Successfully!';
          this.listUsers();
        },
        (err) => {
          console.log('');
          this.errorMessage = err.error.message;
        }
      );
    }
    this.resetForm();
    setTimeout(() => {
      this.message = undefined;
      this.errorMessage = undefined;
    }, 2000);
  }
  editUser(id: number) {
    this.user_service.getUserById(id).subscribe((response) => {
      console.log(response);
      this.user = response;
      this.userForm.controls['email'].disable();
      this.heading = 'Update User';
      this.button = 'Update';
    });
  }
  deleteUser(id: number) {
    this.user_service.deleteUserById(id).subscribe((response) => {
      if (response) {
        this.message = 'User Delete Successfully!';
        this.listUsers();
      }
    });
    setTimeout(() => {
      this.message = undefined;
    }, 2000);
  }

  resetForm() {
    this.heading = 'Create User';
    this.button = 'Save';
    this.userForm.reset(this.userForm.value);
  }
}
