import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast/toast.service';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { ChangereservationModalComponent } from '../changereservation-modal/changereservation-modal.component';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  myForm: FormGroup;
  reservations :any[] = [];
  updateLink = "http://localhost:3000/users";
  reservationsLink = "http://localhost:3000/reservations";
  username :string = "";

  constructor(private fb: FormBuilder,
              private http : HttpClient,
              private toastService : ToastService,
              public dialog: MatDialog,
  ){
    this.myForm = this.fb.group(
      {
            name: [''],
            lastname: [''],
            phone: ['']
      }
    )

  }

  ngOnInit() {

    this.http.get<User>(this.updateLink)
    .subscribe({
      next: (response) => {
        this.myForm.setValue({
          name: response.name || '',
          lastname: response.lastname || '',
          phone: response.phone || '',
        })
        this.username = response.name +' '+ response.lastname;
        console.log(this.username)
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.http.get<any[]>(this.reservationsLink)
    .subscribe({
      next: (response) => {
        this.reservations = response;
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
      this.http.put(this.updateLink, formData)
      .subscribe({
        next: (response) => {
          this.toastService.showMessage('Update successful');
        },
        error: (error) => {
          this.toastService.showMessage('Update Problem');        }
      });
      
      }
  }

  OnDelete(id : string){
    this.http.delete(`${this.reservationsLink}/${id}`)
    .subscribe({
      next: (response) => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  OnUpdate(id : string){
      this.dialog.open(ChangereservationModalComponent, {
        data: { reservationId: id }
      });
  };

}
