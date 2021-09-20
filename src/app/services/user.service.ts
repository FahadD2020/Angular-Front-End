import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { APIToken } from '../models/token.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// This defines the backend API service which can be hit to
// create users, posts, edit them etc.
export class UserService {

  constructor(private http: HttpClient) { }

  // method creates a new user
  CreateUser(user: User): Observable<User>
  {
    return this.http.post<User>(`${environment.BASE_URL}/Users`, user);
  }

  // login using the auth token from backend
  Login(userName:string, password:string): Observable<APIToken>
  {
    return this.http.get<APIToken>(`${environment.BASE_URL}/Users/${userName}/${password}`);
  }

  // create a post
  CreateNewPost(newPost: Post): Observable<Post>
  {
    let token = JSON.parse(localStorage.getItem('authtoken')).token;
    const headers = { Authorization: 'Bearer ' + token };
    return this.http.post<Post>(`${environment.BASE_URL}/Posts`, newPost, {
      headers: headers,
    });
  }

  // fetch all posts
  GetPosts() 
  {
    return this.http.get(`${environment.BASE_URL}/Posts`);
  }


  // delete a post (if authorized)
  DeletePost(postId: string) 
  {
    let token = JSON.parse(localStorage.getItem('authtoken')).token;
    const headers = {Authorization: 'Bearer ' + token};
    return this.http.delete(`${environment.BASE_URL}/Posts/${postId}`, {
      headers: headers,
    });
  }

  // update a post (if authorized)
  UpdatePost(newPost: Post, postId: string)
  {
    let token = JSON.parse(localStorage.getItem('authtoken')).token;
    const headers = {Authorization: 'Bearer ' + token};
    return this.http.patch<Post>(`${environment.BASE_URL}/Posts/${postId}`, newPost, {
      headers: headers,
    });
  }
}
