import { Component } from '@angular/core';
import { Category } from 'src/app/data-type/category';
import { CategoryService } from 'src/app/service/category/category.service';
import {faTrash,faEdit, faSave} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent {
  categories: undefined | Category[];
  category: undefined | Category;
  message: undefined | string;
  errorMessage: undefined | string;
  delete = faTrash;
  edit = faEdit;
  save = faSave;
  constructor(private category_service: CategoryService) {}
  ngOnInit(): void {
    this.listCategory();
  }
  listCategory() {
    this.category_service.getCategory().subscribe((response) => {
      this.categories = response;
      this.category = undefined;
    });
  }
  saveCategory(data: Category): void {
    if (data.id > 0) {
      this.category_service.updateCategory(data).subscribe({
        next: (data) => {
          this.message = 'Category Update Successfully!';
          this.listCategory();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
    } else {
      this.category_service.addCategory(data).subscribe({
        next: (data) => {
          this.message = 'Category Save Successfully!';
          this.listCategory();
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
  editCategory(id: number) {
    id &&
      this.category_service.getCategoryById(id).subscribe((response) => {
        this.category = response;
      });
  }
  deleteCategory(id: number) {
    this.category_service.deleteCategoryById(id).subscribe((response) => {
      if (response) {
        this.message = 'Category Delete Successfully!';
        this.listCategory();
      }
    });
    setTimeout(() => {
      this.message = undefined;
    }, 2000);
  }
}
