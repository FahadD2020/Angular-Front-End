import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-innersanctum',
  templateUrl: './innersanctum.component.html',
  styleUrls: ['./innersanctum.component.css']
})
export class InnersanctumComponent implements OnInit {

  sanctumAccess: boolean = false;

  constructor(private userSvc: AuthGuardService) { }

  ngOnInit(): void {
    var emitter = this.userSvc.UserStateChanged;
    emitter.subscribe((loginStatus) => {
      this.sanctumAccess = loginStatus;
    });
  }
}
