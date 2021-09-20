import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})

// edit a post (only a logged in user can edit and its own posts)
export class EditpostComponent implements OnInit {

  postId: string = '';
  content: string = '';
  title: string = '';
  headerImage: string = '';
  errMsg: string = '';
  currentPost: Post = new Post();

  constructor(
    private userSvc: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute  // used to extract the post id
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('postId');
  }

  // update a post
  UpdatePost() {
    // TODO prefetch previous post value: doesnt work
    this.currentPost.headerImage = this.headerImage;
    this.currentPost.content = this.content;
    this.currentPost.title = this.title;
    this.userSvc.UpdatePost(this.currentPost, this.postId).subscribe(
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
