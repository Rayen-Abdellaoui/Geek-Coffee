import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signLink = 'http://localhost:3000/users/sign-in';
  loginLink = 'http://localhost:3000/users/login';

  constructor(
    private http : HttpClient
  ) {}
  
  signIn (userData : object){
    return this.http.post<{ access_token: string }>(this.signLink, userData)
    .subscribe({
      next: (response) => {
        localStorage.setItem('access_token',response.access_token);
        console.log('Registration successful');
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }

  login (userData : object){
    return this.http.post<{ access_token: string }>(this.loginLink, userData)
    .subscribe({
      next: (response) => {
        localStorage.setItem('access_token',response.access_token);
        console.log('Login successful');
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

}