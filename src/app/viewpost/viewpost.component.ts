import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PostResponse } from '../models/postresp.model';


@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})

export class ViewpostComponent implements OnInit {

  errMsg = '';
  posts: Array<PostResponse> = [];

  constructor(private userSvc: UserService) { }

  // here in init, we fetch all posts from the backend
  ngOnInit(): void {
    this.userSvc.GetPosts().subscribe(
      (resp) => {
        var posts = this.sort_by_key_desc(resp, 'lastUpdated');
        
        posts.forEach((post) => {
          let postresp = new PostResponse();

          postresp.title = post['title'],
            postresp.content = post['content'],
            postresp.headerImage = post['headerImage'],
            postresp.lastUpdated = post['lastUpdated'],
            postresp.postId = post['postId'],
            postresp.userId = post['userId'],

            this.posts.push(postresp);
        });

        this.errMsg = '';
      },
      (err) => {
        this.errMsg = err.error.messsage;
      }
    );
  }

  // https://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects
  sort_by_key_desc(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }
}