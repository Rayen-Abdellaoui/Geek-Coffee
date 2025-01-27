import {ChangeDetectionStrategy, Component,signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-modal',
  imports: [MatDialogTitle, MatDialogContent,
    MatButtonModule,MatFormFieldModule,ReactiveFormsModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  LoginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.LoginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      console.log("Form submitted", this.LoginForm.value);
    }
  }
}
