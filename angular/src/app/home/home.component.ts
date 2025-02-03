import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openReservationModal(): void {
    console.log('Opening reservation modal...');
    this.dialog.open(ReservationModalComponent, {
      width: '300px',
      backdropClass: 'custom-backdrop',
    });
  }
}

