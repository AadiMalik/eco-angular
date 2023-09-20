import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/data-type/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private route: Router) {}
  getCategory() {
    return this.http.get<Category[]>(
      'http://localhost/EcoApi/api/list-category'
    );
  }
  addCategory(data: Category) {
    return this.http.post('http://localhost/EcoApi/api/add-category', data);
  }
  getCategoryById(id: number) {
    return this.http.get<Category>(
      'http://localhost/EcoApi/api/edit-category/' + id
    );
  }
  updateCategory(data: Category) {
    return this.http.post('http://localhost/EcoApi/api/update-category', data);
  }
  deleteCategoryById(id: number) {
    return this.http.get('http://localhost/EcoApi/api/delete-category/' + id);
  }
}
