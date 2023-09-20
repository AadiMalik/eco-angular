import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Blog, Search } from 'src/app/data-type/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private route: Router) {}
  getBlogs() {
    return this.http.get<Blog[]>('http://localhost/EcoApi/api/list-blogs');
  }
  addBlog(data: Blog) {
    return this.http.post('http://localhost/EcoApi/api/add-blog', data);
  }
  getBlogById(id: number) {
    return this.http.get<Blog>('http://localhost/EcoApi/api/edit-blog/' + id);
  }
  updateBlog(data: Blog) {
    return this.http.post('http://localhost/EcoApi/api/update-blog', data);
  }
  deleteBlogById(id: number) {
    return this.http.get('http://localhost/EcoApi/api/delete-blog/' + id);
  }
  getBlogByCategory(id: number) {
    return this.http.get<Blog[]>(
      'http://localhost/EcoApi/api/blog-by-category/' + id
    );
  }
  getBlogBySearch(search: string) {
    return this.http.get<Blog[]>(
      'http://localhost/EcoApi/api/search-blog?search=' + search
    );
  }
  getBlogBySlug(slug: string) {
    return this.http.get<Blog>('http://localhost/EcoApi/api/get-blog-slug/' + slug);
  }
}
