import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  images = [
    "assets/gallery9.jpg", "assets/gallery12.jpg", "assets/gallery11.jpg",
    "assets/billard.jpg", "assets/gallery1.jpg", "assets/gallery6.jpg",
    "assets/gallery2.jpg", "assets/gallery13.jpg", "assets/gallery4.jpg",
    "assets/gallery5.jpg", "assets/gallery.jpg", "assets/geek.jpg"
  ];

  itemsPerPage = 6;
  currentPage = 1;

  get paginatedImages() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.images.slice(start, start + this.itemsPerPage);
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
  }
  getPageNumbers(): number[] {
    return Array.from({ length: Math.ceil(this.images.length / this.itemsPerPage) }, (_, i) => i + 1);
  }
  
}
