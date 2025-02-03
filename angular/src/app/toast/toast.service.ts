import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  showMessage(message: string, duration: number = 3000) {
    this._snackBar.open(message, 'X', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['toast-error']
      });
  }
}
