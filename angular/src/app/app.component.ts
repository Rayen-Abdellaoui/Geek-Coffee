import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';
import { ReservationComponent } from './reservation/reservation.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    ReactiveFormsModule,
    GalleryComponent,
    ReservationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Geek Coffee';
}
