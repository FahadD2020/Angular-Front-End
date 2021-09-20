import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;  // initially not logged in

  constructor(
    private router: Router,
    private authSvc: AuthGuardService) { }

  // following executes on initializing this ng component
  // use user service to log in
  ngOnInit(): void {
    var emitter = this.authSvc.UserStateChanged;
    emitter.subscribe((loginStatus) => {
      this.isLoggedIn = loginStatus;
    });
  }

  // use user service to logout and navigate to home
  Logout() {
    this.authSvc.Logout();
    this.router.navigate(['/home']);
  }
}
