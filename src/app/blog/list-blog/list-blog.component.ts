import { Component } from '@angular/core';
import { Blog } from 'src/app/data-type/blog';
import { Category } from 'src/app/data-type/category';
import { BlogService } from 'src/app/service/blog/blog.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { faTrash, faEdit, faSave, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css'],
})
export class ListBlogComponent {
  blogForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  categories: undefined | Category[];
  blogs: undefined | Blog[];
  blog: undefined | Blog;
  message: undefined | string;
  errorMessage: undefined | string;
  delete = faTrash;
  edit = faEdit;
  save = faSave;
  reset = faRefresh;
  button = 'Save';
  heading = 'Create User';
  constructor(
    private blog_service: BlogService,
    private category_service: CategoryService
  ) {}
  ngOnInit(): void {
    this.listBlogs();
    this.listCategory();
  }
  listCategory() {
    this.category_service.getCategory().subscribe((response) => {
      this.categories = response;
    });
  }
  listBlogs() {
    this.blog_service.getBlogs().subscribe((response) => {
      console.log(response);
      this.blogs = response;
    });
  }
  saveBlog(id: number | undefined): void {
    let obj = {
      id: id,
      title: this.blogForm.get('title')?.value,
      category_id: this.blogForm.get('category_id')?.value,
      url: this.blogForm.get('url')?.value,
      description: this.blogForm.get('description')?.value,
    };
    if (obj && obj.id != undefined) {
      this.blog_service.updateBlog(obj).subscribe(
        (data) => {
          this.message = 'Blog Update Successfully!';
          this.listBlogs();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    } else {
      this.blog_service.addBlog(obj).subscribe(
        (data) => {
          this.message = 'Blog Save Successfully!';
          this.listBlogs();
        },
        (err) => {
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
  editBlog(id: number) {
    this.blog_service.getBlogById(id).subscribe((response) => {
      console.log(response);
      this.blog = response;
      this.heading = 'Update Blog';
      this.button = 'Update';
    });
  }
  deleteBlog(id: number) {
    this.blog_service.deleteBlogById(id).subscribe((response) => {
      if (response) {
        this.message = 'Blog Delete Successfully!';
        this.listBlogs();
      }
    });
    setTimeout(() => {
      this.message = undefined;
    }, 2000);
  }
  resetForm() {
    this.heading = 'Create Blog';
    this.button = 'Save';
    this.blogForm.reset(this.blogForm.value);
  }
}
