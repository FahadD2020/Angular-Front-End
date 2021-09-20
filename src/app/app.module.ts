import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NewuserComponent } from './newuser/newuser.component';
import { UserService } from './services/user.service'; 
import { AppRoutingModule } from './approuter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { InnersanctumComponent } from './innersanctum/innersanctum.component';
import { NewpostComponent } from './newpost/newpost.component';
import { EditpostComponent } from './editpost/editpost.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NewuserComponent,
    LoginComponent,
    InnersanctumComponent,
    NewpostComponent,
    EditpostComponent,
    ViewpostComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,       // for ngModel 2-way binding
    HttpClientModule   // for making calls to backend API
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
