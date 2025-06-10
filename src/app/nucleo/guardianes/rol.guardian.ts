import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlmacenamientoServicio } from '../servicios/almacenamiento.servicio';

@Injectable({
  providedIn: 'root',
})
export class RolGuardian implements CanActivate {
  constructor(private almacenamiento: AlmacenamientoServicio, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rolesPermitidos = route.data['roles'] as string[];
    const rolUsuario = this.almacenamiento.obtenerRolDesdeToken();

    if (rolesPermitidos.includes(rolUsuario)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
