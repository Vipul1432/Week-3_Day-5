import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  newPost = { title: '', body: '' };

  constructor(private http: HttpClient, private router: Router, private blogService: BlogService) {}

  createPost(): void {
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', this.newPost).subscribe(
      (createdPost) => {
        // Append the newly created post to the fetched posts array
        this.blogService.appendFetchedPost(createdPost);

        // Redirect to the Blog page after creating the post
        this.router.navigate(['/blog']);
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
}
