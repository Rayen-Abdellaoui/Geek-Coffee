import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  myForm: FormGroup;
  updateLink = "http://localhost:3000/users"
  constructor(private fb: FormBuilder,private http : HttpClient,private authservice : AuthService,toastService : ToastService){
    this.myForm = this.fb.group(
      {
            name: [''],
            lastname: [''],
            phone: ['']
      }
    )
  }

  ngOnInit() {
    this.authservice.get(this.updateLink)
    .subscribe({
      next: (response) => {
        this.myForm.setValue({
          name: response.name || '',
          lastname: response.lastname || '',
          phone: response.phone || '',
        })
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = {
        name: this.myForm.value.name,
        lastname: this.myForm.value.lastname,
        phone: this.myForm.value.phone,
      };
      const token = localStorage.getItem('access_token');
      const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
      this.http.put(this.updateLink, formData,{headers})
      .subscribe({
        next: (response) => {
          console.log('Update successful');
        },
        error: (error) => {
          if(error.error.message){
            console.log(error.error.message);
          }
        }
      });
      
      }
  }
}
