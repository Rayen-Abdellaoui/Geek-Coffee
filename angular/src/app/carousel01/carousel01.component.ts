import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CarouselComponent, CarouselInnerComponent, CarouselItemComponent, ThemeDirective } from '@coreui/angular';

@Component({
  selector: 'carousel',
  templateUrl: './carousel01.component.html',
  styleUrls: ['./carousel01.component.scss'],
  standalone: true,
  imports: [ThemeDirective, CarouselComponent, CarouselInnerComponent, NgFor, CarouselItemComponent]
})
export class Carousel01Component implements OnInit {

  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      src: '../../assets/geek.jpg'
    };
    this.slides[1] = {
      src: '../../assets/carousel2.jpg'
    };
    this.slides[2] = {
      src: '../../assets/carousel3.jpg'
    };
  }


}
