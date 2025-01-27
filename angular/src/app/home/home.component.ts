import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { Carousel01Component } from "../carousel01/carousel01.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule, Carousel01Component],
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

