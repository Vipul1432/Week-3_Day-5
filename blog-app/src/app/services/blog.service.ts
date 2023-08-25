import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getBlogPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
