import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postId!: number;
  post: any;
  comments: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.postId = +id;
        this.fetchPostDetails();
        this.fetchPostComments();
      }
    });
  }

  fetchPostDetails(): void {
    const postUrl = `https://jsonplaceholder.typicode.com/posts/${this.postId}`;
    this.http.get<any>(postUrl).subscribe(post => {
      this.post = post;
    });
  }

  fetchPostComments(): void {
    const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`;
    this.http.get<any[]>(commentsUrl).subscribe(comments => {
      this.comments = comments;
    });
  }
}
