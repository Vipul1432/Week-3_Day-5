import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: any = { title: '', body: '' };
  postId!: number;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.postId = +id;
        this.fetchPostData();
      }
    });
  }

  fetchPostData(): void {
    this.blogService.getPostById(this.postId).subscribe(
      (post) => {
        this.post = post;
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }

  updatePost(): void {
    this.blogService.updatePost(this.postId, this.post).subscribe(
      () => {
        console.log('Post updated successfully');
        // Update the locally displayed data with the edited post
        this.blogService.updateLocalPost(this.postId, this.post);

        // Navigate back to the blog page
        this.router.navigate(['/blog']);
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }
}
