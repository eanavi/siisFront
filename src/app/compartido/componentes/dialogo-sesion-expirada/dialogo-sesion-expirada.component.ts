import { Component, inject } from "@angular/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";

const MODS_MATERIAL = [MatDialogModule, MatButtonModule];
@Component({
  selector: 'dialogo-sesion-expirada',
  standalone: true,
  imports: [ CommonModule, ...MODS_MATERIAL],
  template: `
    <h2 mat-dialog-title>Sesión Expirada</h2>
    <mat-dialog-content>
      Tu Sesión ha expirado. Por favor inicia sesión nuevamente.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="redirecALogin()">Iniciar sesión </button>
    </mat-dialog-actions>
  `
})
export class DialogoSesionExpiradaComponent {
  constructor(
    private router: Router,
    private dialogoRef: MatDialogRef<DialogoSesionExpiradaComponent>
  ) {}


  redirecALogin(){
    localStorage.removeItem('token');
    this.dialogoRef.close();
    this.router.navigate(['/login']);
  }
}
