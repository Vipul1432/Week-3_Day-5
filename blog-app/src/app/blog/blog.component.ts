import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPosts: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.fetchBlogPosts();
  }

  fetchBlogPosts(): void {
    this.blogService.getBlogPosts().subscribe(
      (posts) => {
        this.blogPosts = posts;
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }
}
