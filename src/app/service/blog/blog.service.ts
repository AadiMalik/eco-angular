import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Blog, Search } from 'src/app/data-type/blog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  heading = environment.title;
  apiURL = environment.apiURL;
  constructor(private http: HttpClient, private route: Router) {}
  getBlogs() {
    return this.http.get<Blog[]>(this.apiURL + 'list-blogs');
  }
  addBlog(data: Blog) {
    return this.http.post(this.apiURL + 'add-blog', data);
  }
  getBlogById(id: number) {
    return this.http.get<Blog>(this.apiURL + 'edit-blog/' + id);
  }
  updateBlog(data: Blog) {
    return this.http.post(this.apiURL + 'update-blog', data);
  }
  deleteBlogById(id: number) {
    return this.http.get(this.apiURL + 'delete-blog/' + id);
  }
  getBlogByCategory(id: number) {
    return this.http.get<Blog[]>(this.apiURL + 'blog-by-category/' + id);
  }
  getBlogBySearch(search: string) {
    return this.http.get<Blog[]>(this.apiURL + 'search-blog?search=' + search);
  }
  getBlogBySlug(slug: string) {
    return this.http.get<Blog>(this.apiURL + 'get-blog-slug/' + slug);
  }
}
