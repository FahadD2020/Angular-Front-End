import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewuserComponent } from './newuser/newuser.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewpostComponent } from './newpost/newpost.component';
import { EditpostComponent } from './editpost/editpost.component';

const routes: Routes = [
  {
    path: 'newuser',
    component: NewuserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'newpost',
    component: NewpostComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'editpost',
    component: EditpostComponent,
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
