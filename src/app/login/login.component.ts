import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string = '';
  password: string = '';
  errMsg: string = '';

  constructor(private userSvc: UserService,
    private authSvc: AuthGuardService,
    private router: Router) { }

  ngOnInit(): void {}

  // try to login from the login page using the services
  Login(): void
  {
    // if login is valid, the backend with send an auth toke
    // (JWT) in the response. We save it (in localstorage), and
    // this user uses that authtoken for authenticating further requests
    this.userSvc.Login(this.userId, this.password).subscribe(
      (res) => {
        //console.log(res);   // this has the auth token
        this.authSvc.Login(res);
        this.router.navigate(['/home']); // goto home when logged in
      },

      // for now, directly printing the error back to user
      // by setting errMsg. We can 'neatify' that optionally
      (err) => {
        console.log(err);
        this.errMsg = err.error.messsage;
      }
    );

  }

}
