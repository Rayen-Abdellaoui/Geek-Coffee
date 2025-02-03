import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pagination } from '@mui/material';


@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [
    
    RouterLink
    
  ]
})
export class PaginationsComponent {
  currentPage = 1;

}
