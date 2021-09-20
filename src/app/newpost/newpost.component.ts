import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})

// component to create a new post
export class NewpostComponent implements OnInit {

  newPost: Post;
  content: string = '';
  title: string = '';
  headerImage: string = '';
  errMsg = '';

  constructor(
    private postSvc: UserService, 
    private router: Router) {}


  ngOnInit(): void {
    this.newPost = new Post();
  }

  // create a new post by current logged in user
  CreateNewPost() {
    this.newPost.content = this.content;
    this.newPost.title = this.title;
    this.newPost.headerImage = this.headerImage;   // base64 encoded string

    // call service to create new post
    this.postSvc.CreateNewPost(this.newPost).subscribe(
      (_) => {
        this.router.navigate(['/home']);
        this.errMsg = '';
      },
      (err) => {
        console.log(err);
        this.errMsg = err.error.messsage;
      }
    );
  }
}