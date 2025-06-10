import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-estructura-principal',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MenuLateralComponent // Importamos nuestro menú lateral
  ],
  templateUrl: './estructura-principal.component.html',
  styleUrls: ['./estructura-principal.component.css']
})
export class EstructuraPrincipalComponent {
  // La lógica principal estará en el menú lateral y en las vistas del router-outlet
}
