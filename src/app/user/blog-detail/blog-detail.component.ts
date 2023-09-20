import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/data-type/blog';
import { BlogService } from 'src/app/service/blog/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent {
  blog: undefined | Blog;
  constructor(
    private blog_service: BlogService, private activeRoute:ActivatedRoute
  ) {}
  ngOnInit(): void {
    let slug = this.activeRoute.snapshot.paramMap.get('query');
    slug && this.blogDetail(slug);
  }
  blogDetail(slug:string) {
    this.blog_service.getBlogBySlug(slug).subscribe((response) => {
      this.blog = response;
    });
  }
}
