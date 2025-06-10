import { Injectable, inject } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { DialogoSesionExpiradaComponent } from "@compartido/componentes/dialogo-sesion-expirada/dialogo-sesion-expirada.component";
import { AlmacenamientoServicio } from "@nucleo/servicios/almacenamiento.servicio";
import { NotificacionServicio } from '@compartido/servicios/notificacion.servicio';

@Injectable({ providedIn: 'root' })
export class SesionServicio{
  dialogo = inject(MatDialog);

  almacenamiento = inject(AlmacenamientoServicio);
  notificacion = inject(NotificacionServicio);

  /**umbral de advertencia en segundos antes que expire el token */
  private adevertencia = 60;

  /** Verfica si el token ha expirado o esta por expirar */

  verficarToken(): void {
    const token = this.almacenamiento.obtenerToken();

    if (!token) return;

    try{
      const decodificado : any = jwtDecode(token);
      const ahora = Math.floor(Date.now() / 1000); //tiempo actual en segundos
      const exp = decodificado.exp;

      if (!exp) return;

      const tiempoRestante = exp - ahora;

      if (tiempoRestante <= 0){
        this.mostrarDialogoSesionExpirada(); //expirado
      } else if (tiempoRestante <= this.adevertencia){
        this.mostrarDialogoSesionExpirada(); //Esta por expirar
      }
    } catch (error){
      this.notificacion.mostrarError('Error el decodificador token ')
    }
  }

  private mostrarDialogoSesionExpirada(): void {
    const dialog = this.dialogo.openDialogs;
    if(dialog.length === 0){
      this.dialogo.open(DialogoSesionExpiradaComponent,{
        disableClose: true
      });
    }
  }

}
