import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
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
    FormsModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: './changereservation-modal.component.html',
  styleUrl: './changereservation-modal.component.css'
})
export class ChangereservationModalComponent{
  selected: Date | null = null;
  startTime: string ='';
  endTime: string ='';
  categories: any[] = ["Arcade","Billard Table","Card & Board Games","Playstation"];
  selectedCategory: string = '';
  Guests: string ='';
  timeSlots: string[] = [];
  reservationUrl ="http://localhost:3000/reservations";

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ChangereservationModalComponent>,
    private toastService : ToastService,
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: string }
  ) {
    this.dialogRef.disableClose = false;
  }


  close(): void {
    this.dialogRef.close();
  }

  onBackdropClick(event: MouseEvent): void {
    this.dialogRef.close();
  }


  update(): void {
    if (
      !this.selected ||
      !this.startTime ||
      !this.endTime ||
      !this.Guests ||
      !this.selectedCategory
    ) {
      this.toastService.showMessage('Please fill in all fields in the form')
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

    this.http.put(`${this.reservationUrl}/${this.data.reservationId}`, reservation)
      .subscribe({
        next: (response) => {
          location.reload();
        },
        error: (error) => {
          this.toastService.showMessage(error.error.message);
        }
      });
  } 
}
