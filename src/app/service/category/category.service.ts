import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/data-type/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  heading = environment.title;
  apiURL = environment.apiURL;
  constructor(private http: HttpClient, private route: Router) {}
  getCategory() {
    return this.http.get<Category[]>(this.apiURL + 'list-category');
  }
  addCategory(data: any) {
    return this.http.post(this.apiURL + 'add-category', data);
  }
  getCategoryById(id: number) {
    return this.http.get<Category>(this.apiURL + 'edit-category/' + id);
  }
  updateCategory(data: any) {
    return this.http.post(this.apiURL + 'update-category', data);
  }
  deleteCategoryById(id: number) {
    return this.http.get(this.apiURL + 'delete-category/' + id);
  }
}
