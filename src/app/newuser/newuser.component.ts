import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  user: User;
  errMsg: string = '';

  constructor(
    private userSvc: UserService,
    private router: Router) {}

  // initialize
  ngOnInit(): void {
    this.user = new User();
  }

  // create a new user from backend API
  CreateUser(): void 
  {
    // subscribe to an Observable<User> where we get 
    // backend response
    this.userSvc.CreateUser(this.user).subscribe(
      (res: User) => {
        //console.log(res);
        this.router.navigate(['/login']);
        this.errMsg = '';
      },
      (err: any) => {
        console.log(err);
        this.errMsg = err.error.messsage;
      }
    );
  }
}