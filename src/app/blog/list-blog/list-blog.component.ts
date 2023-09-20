import { Component } from '@angular/core';
import { Blog } from 'src/app/data-type/blog';
import { Category } from 'src/app/data-type/category';
import { BlogService } from 'src/app/service/blog/blog.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css'],
})
export class ListBlogComponent {
  categories: undefined | Category[];
  blogs: undefined | Blog[];
  blog: undefined | Blog;
  message: undefined | string;
  errorMessage: undefined | string;
  delete = faTrash;
  edit = faEdit;
  save = faSave;
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
  saveBlog(data: Blog): void {
    if (data.id > 0) {
      this.blog_service.updateBlog(data).subscribe(
        (data) => {
          this.message = 'Blog Update Successfully!';
          this.listBlogs();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    } else {
      this.blog_service.addBlog(data).subscribe(
        (data) => {
          this.message = 'Blog Save Successfully!';
          this.listBlogs();
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
    }
    setTimeout(() => {
      this.message = undefined;
      this.errorMessage = undefined;
    }, 2000);
  }
  editBlog(id: number) {
    this.blog_service.getBlogById(id).subscribe((response) => {
      console.log(response);
      this.blog = response;
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
}
