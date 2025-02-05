import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { ErrorpageComponent } from './errorpage/errorpage.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home Page' },
    { path: 'gallery', component: GalleryComponent, title: 'Gallery' },
    { path: 'about', component: AboutComponent, title: 'About' },
    { path: 'reservation', component: ReservationComponent, title: 'Reservation' },
    { path: 'profile', component: ProfileComponent, title: 'Profile',canActivate:[AuthGuard] },
    {path: '**', component: ErrorpageComponent }
];
