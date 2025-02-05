import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  backgroundImage = 'assets/resback3.jpg';
  cards = [
    {
      image: "assets/offer1.jpg",
      title: 'Playstation',
      text: 'Enjoy your favorite playstation games.'
    },
    {
      image: "assets/gallery10.jpg",
      title: 'Arcade',
      text: 'Participate in retro arcade game tournaments.'
    },
    {
      image: "assets/offer2.jpg",
      title: 'Eat your fill',
      text: 'Enjoy a variety of healthy and delicious meals.'
    },
    {
      image: "assets/offer3.jpg",
      title: 'Special offers',
      text: 'Keep an eye on our irresistable deals.'
    }
  ];
}