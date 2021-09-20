import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

// this component helps us do update posts (if authorized)
export class PostComponent implements OnInit {

  @Input() currentUser: boolean = false;
  @Input() postId: string = '';
  @Input() content: string = '';
  @Input() title: string = '';
  @Input() userId: string = '';
  @Input() lastUpdated: string = '';

  errorMsg: string = '';

  constructor(
    private userSvc: UserService,
    private router: Router) { }

  ngOnInit(): void { }

  // edit a post if authorized (current user)
  EditPost() {
    if (this.userId === this.GetCurrUser()) {
      this.router.navigate(['/editpost', { postId: this.postId }]);
    } else {
      window.alert('You can only edit your posts!');
    }
  }

  // delete a post
  DeletePost() {
    if (this.userId == this.GetCurrUser()) {
      if (confirm('Confirm deletion?')) {
        this.userSvc.DeletePost(this.postId).subscribe(
          (_) => {

            // hack: reloading so that the deleted post is reflected
            // Ideally would want to reload only home component
            // https://stackoverflow.com/questions/47813927/how-to-refresh-a-component-in-angular
            window.location.reload();
            this.errorMsg = '';
          },
          (err) => {
            console.log(err);
            this.errorMsg = err.error.messsage;
          }
        );
      }
    } else {
      window.alert('You can only delelte your posts!');
    }
  }

  // get the current used using the auth token
  GetCurrUser() {
    let token;
    let payload;
    if (localStorage.getItem('authtoken') != null) {
      token = JSON.parse(localStorage.getItem('authtoken')).token;
    } else {
      return false;
    }

    // decode JWT
    payload = null;
    try {
      payload = jwt_decode(token);
    } catch (Error) {
      payload = null;
    }

    // console.log(payload['UserData']);
    return payload['UserData']['userId'];
  }
}
