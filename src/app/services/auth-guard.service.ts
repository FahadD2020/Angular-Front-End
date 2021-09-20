import { Injectable, EventEmitter, Output } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { APIToken } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  @Output() UserStateChanged = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  // canActivate interface method
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authToken = localStorage.getItem('authtoken');
    if (authToken !== null){
      return true;
    }
    // auth failed. Navigate to login 
    this.router.navigate(['/login']);
    return false;
  }

  // login a user using an auth token
  Login(authToken: APIToken): void
  {
    localStorage.setItem('authtoken', JSON.stringify(authToken));
    this.UserStateChanged.emit(true);
  }

  // logout the user: remove auth token from storage
  // and set logged in state to false
  Logout(): void
  {
    localStorage.removeItem('authtoken');
    this.UserStateChanged.emit(false);
  }
}
