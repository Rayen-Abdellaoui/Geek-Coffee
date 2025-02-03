import {ChangeDetectionStrategy, Component,inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrl: './signin-modal.component.css',
  imports: [MatDialogTitle, MatDialogContent, MatDialogClose,
              MatButtonModule,MatFormFieldModule,ReactiveFormsModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninModalComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private toastService:ToastService
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      check: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = {
        name: this.myForm.value.name,
        lastname: this.myForm.value.lastname,
        email: this.myForm.value.email,
        phone: this.myForm.value.phone,
        password: this.myForm.value.password,
        agreedToTerms: this.myForm.value.check
      };

      this.authService.signIn(formData)
      .subscribe({
        next: (response) => {
          localStorage.setItem('access_token',response.access_token);
          console.log('Registration successful');
        },
        error: (error) => {
          this.toastService.showMessage(error.error.message);
        }
      });
      
    }
  }
}