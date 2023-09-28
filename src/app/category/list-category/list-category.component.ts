import { Component } from '@angular/core';
import { Category } from 'src/app/data-type/category';
import { CategoryService } from 'src/app/service/category/category.service';
import {faTrash,faEdit, faSave, faRefresh} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent {
  categoryForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
  });
  categories: undefined | Category[];
  category: undefined | Category;
  message: undefined | string;
  errorMessage: undefined | string;
  delete = faTrash;
  edit = faEdit;
  save = faSave;
  reset = faRefresh;
  button = 'Save';
  heading = 'Create User';
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
  saveCategory(id:number|undefined): void {
    let obj = {
      id: id,
      name: this.categoryForm.get('name')?.value
    };
    if (obj && obj.id != undefined) {
      this.category_service.updateCategory(obj).subscribe({
        next: (data) => {
          this.message = 'Category Update Successfully!';
          this.listCategory();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
    } else {
      this.category_service.addCategory(obj).subscribe({
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
        this.heading = 'Update Blog Category';
        this.button = 'Update';
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
  resetForm() {
    this.heading = 'Create Blog Category';
    this.button = 'Save';
    this.categoryForm.reset(this.categoryForm.value);
  }
}
