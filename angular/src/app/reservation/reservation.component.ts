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
      text: 'enjoy your favorite playstation games.'
    },
    {
      image: "assets/gallery10.jpg",
      title: 'arcade',
      text: 'participate in retro arcade game tournaments.'
    },
    {
      image: "assets/offer2.jpg",
      title: 'Eat your fill',
      text: 'enjoy a variety of healthy and delicious meals.'
    },
    {
      image: "assets/offer3.jpg",
      title: 'special offers',
      text: 'keep an eye on our irresistable deals.'
    }
  ];
  ngOnInit() {
    console.log(this.cards); 
  }
}