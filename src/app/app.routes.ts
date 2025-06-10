import { Routes } from '@angular/router';
import { LoginComponent } from '@modulos/auth/login/login.component';
import { EstructuraPrincipalComponent } from './estructuras/estructura-principal/estructura-principal.component';
import { BusquedaGenericaComponent } from './estructuras/estructura-principal/componentes/busqueda-generica/busqueda-generica.component';
import { PacientesComponent } from './modulos/pacientes/pacientes.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'principal',
    component: EstructuraPrincipalComponent,
    children:[
      { path: 'buscar-personas', component: BusquedaGenericaComponent },
      //incluir mas opciones del menu

      { path: '', redirectTo: 'buscar-personas', pathMatch:'full' },
      { path: 'pacientes', component: PacientesComponent },
    ]
  },


  { path: '', redirectTo: 'pacientes', pathMatch: 'full' }
];
