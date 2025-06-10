import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticacionServicio } from '@nucleo/servicios/autenticacion.servicio';


@Injectable({
  providedIn: 'root',
})
export class AutenticacionGuardian implements CanActivate{
  constructor(private autenticacionServicio: AutenticacionServicio, private router: Router){
  }

  canActivate(): boolean{
    if (this.autenticacionServicio.estaAutenticado()){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

}
