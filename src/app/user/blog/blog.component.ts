import { Component } from '@angular/core';
import { Blog, Search } from 'src/app/data-type/blog';
import { Category } from 'src/app/data-type/category';
import { BlogService } from 'src/app/service/blog/blog.service';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  categories: undefined | Category[];
  blogs: undefined | Blog[];
  blog: undefined | Blog;
  message: undefined | string;
  errorMessage: undefined | string;
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
      this.blogs = response;
    });
  }
  blogsByCategory(id: number) {
    this.blog_service.getBlogByCategory(id).subscribe((response) => {
      this.blogs = response;
    });
  }
  searchBlog(search: string) {
    this.blog_service.getBlogBySearch(search).subscribe((response) => {
      this.blogs = response;
    });
  }
}
