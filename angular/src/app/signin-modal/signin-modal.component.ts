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
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrl: './signin-modal.component.css',
  imports: [MatDialogTitle, MatDialogContent, 
              MatButtonModule,MatFormFieldModule,ReactiveFormsModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninModalComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      console.log("Form submitted", this.myForm.value);
    }
  }
}