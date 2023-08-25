import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogPosts$ = new BehaviorSubject<any[]>([]);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
    this.fetchBlogPosts(); // Fetch posts once when the service is initialized
  }

  getBlogPosts(): Observable<any[]> {
    return this.blogPosts$.asObservable();
  }

  private fetchBlogPosts(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (posts) => {
        this.blogPosts$.next(posts);
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }
  getPostById(postId: number): Observable<any> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.get<any>(url);
  }

  updatePost(postId: number, updatedPost: any): Observable<any> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.put<any>(url, updatedPost);

    
  }

  updateLocalPost(postId: number, updatedPost: any): void {
    const currentPosts = this.blogPosts$.getValue();
    const updatedPosts = currentPosts.map(post => {
      if (post.id === postId) {
        return updatedPost;
      }
      return post;
    });
    this.blogPosts$.next(updatedPosts);
  }

  appendFetchedPost(newPost: any): void {
    const currentPosts = this.blogPosts$.getValue();
    const updatedPosts = [...currentPosts, newPost];
    this.blogPosts$.next(updatedPosts);
  }
}
