import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../data-type/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  heading = environment.title;
  apiURL = environment.apiURL;
  constructor(private http: HttpClient, private route: Router) {}
  getUsers() {
    return this.http.get<User[]>(this.apiURL + 'list-users');
  }
  addUser(data: any) {
    return this.http.post(this.apiURL + 'add-user', data);
  }
  getUserById(id: number) {
    return this.http.get<User>(this.apiURL + 'edit-user/' + id);
  }
  updateUser(data:any) {
    return this.http.post(this.apiURL + 'update-user', data);
  }
  deleteUserById(id: number) {
    return this.http.get(this.apiURL + 'delete-user/' + id);
  }
}
