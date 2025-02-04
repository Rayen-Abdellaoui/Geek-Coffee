import {ChangeDetectionStrategy, Component,} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login-modal',
  imports: [MatDialogTitle, MatDialogContent,MatDialogClose,
    MatButtonModule,MatFormFieldModule,ReactiveFormsModule,CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  LoginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService:AuthService
  ) {
    this.LoginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      const loginData = {
        email: this.LoginForm.value.email,
        password: this.LoginForm.value.password,
      };

      this.authService.login(loginData);      
    }
  }
}
