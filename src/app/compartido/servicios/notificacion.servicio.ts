import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificacionServicio{
  constructor(private snackBar:MatSnackBar){}

  mostrarError(mensaje: string){
    this.snackBar.open(mensaje, 'Cerrar', {duration: 3000, panelClass:['error-snackbar']});
  }
}
