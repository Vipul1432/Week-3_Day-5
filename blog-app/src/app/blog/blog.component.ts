import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts: any[] = [];
  private blogSubscription!: Subscription;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogSubscription = this.blogService.getBlogPosts().subscribe(
      (posts) => {
        this.blogPosts = posts;
        console.log(posts);
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.blogSubscription) {
      this.blogSubscription.unsubscribe();
    }
  }
}