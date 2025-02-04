import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast/toast.service';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signLink = 'http://localhost:3000/users/sign-in';
  loginLink = 'http://localhost:3000/users/login';


  constructor(
    private http : HttpClient,
    private toastService : ToastService
  ) {}

  
  signIn (userData : object){
    return this.http.post<{ access_token: string }>(this.signLink, userData)
    .subscribe({
      next: (response) => {
        localStorage.setItem('access_token',response.access_token);
        location.reload();
        console.log('Registration successful');
      },
      error: (error) => {
        if(error.error.message){
          this.toastService.showMessage(error.error.message);
        }
        this.toastService.showMessage(error.error.message);
      }
    });
    
  }

  login (userData : object){
    return this.http.post<{ access_token: string }>(this.loginLink, userData)
    .subscribe({
      next: (response) => {
        localStorage.setItem('access_token',response.access_token);
        location.reload();
        console.log('Login successful');
      },
      error: (error) => {
        if(error.error.message){
          this.toastService.showMessage(error.error.message);
        }
      }
    });
  }

  logout():void{
    localStorage.removeItem('access_token');
  }

  get(url: string): Observable<User> {
    const token = localStorage.getItem('access_token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<User>(url, { headers });
  }

}