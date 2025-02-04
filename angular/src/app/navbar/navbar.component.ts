import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SigninModalComponent } from '../signin-modal/signin-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(public dialog: MatDialog,
              private authservice : AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('access_token');
  }

  openSignin() {
    this.dialog.open(SigninModalComponent);
  }

  openLogin() {
    this.dialog.open(LoginModalComponent);
  }

  logout() {
    this.authservice.logout();
    location.reload();
  }
}
