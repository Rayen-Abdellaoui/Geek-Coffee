import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
} from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { catchError, of } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NameFormatPipe, PhoneFormatPipe } from '../shared/pipes/pipes';
import { ToastService } from '../toast/toast.service';


registerLocaleData(localeFr);

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    NameFormatPipe,
    PhoneFormatPipe,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css'],
})
export class ReservationModalComponent  {
  selected: Date | null = null;
  startTime: string ='';
  endTime: string ='';
  name: string | null = null;
  Guests: number | null = null;
  phone: string ='';
  email: string | null = null;
  categories: any[] = ["Arcade","Billard Table","Card & Board Games","Playstation"];
  selectedCategory: string = '';
  timeSlots: string[] = [];
  reservationUrl ="http://localhost:3000/reservations";

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    private snackBar: MatSnackBar,
    private toastService : ToastService
  ) {
    this.dialogRef.disableClose = false;
  }


  close(): void {
    this.dialogRef.close();
  }

  onBackdropClick(event: MouseEvent): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (
      !this.selected ||
      !this.startTime ||
      !this.endTime ||
      !this.name ||
      !this.Guests ||
      !this.phone ||
      !this.email ||
      !this.selectedCategory
    ) {
      this.snackBar.open(
        'Please fill in all fields in the form.',
        'Close',
        {
          duration: 5000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
        }
      );
      return;
    }

    const localDate = new Date(this.selected);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      )
    );


    const reservation = {
      date: utcDate.toISOString().split('T')[0],
      hour_start: this.startTime,
      hour_end: this.endTime,
      guests:this.Guests,
      category: this.selectedCategory,
    };

    const token = localStorage.getItem('access_token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    this.http.post(this.reservationUrl, reservation,{headers})
      .subscribe({
        next: (response) => {
          this.toastService.showMessage("Reservation added successfully");
          this.dialogRef.close();
        },
        error: (error) => {
          if(error.error.message){
            this.toastService.showMessage(error.error.message);
          }
          this.toastService.showMessage(error.error.message);
        }
      });
  } 
}
