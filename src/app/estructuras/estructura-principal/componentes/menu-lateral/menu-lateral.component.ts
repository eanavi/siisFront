import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ItemMenu } from '@nucleo/modelos/menu.modelo';
import { AutenticacionServicio } from '@nucleo/servicios/autenticacion.servicio';
import { AlmacenamientoServicio } from '@nucleo/servicios/almacenamiento.servicio';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  public itemsMenu: ItemMenu[] = [];

  constructor(
    private authServicio: AutenticacionServicio,
    private router: Router,
    private almacenServicio: AlmacenamientoServicio
  ) {}

  ngOnInit(): void {
    const rolUsuario = this.almacenServicio.obtenerRolDesdeToken(); // Debes implementar este método en tu servicio

    if (rolUsuario) {
      this.authServicio.obtenerMenuPorRol(rolUsuario).subscribe(items => {
        this.itemsMenu = items;
        this.navegarAPrimeraOpcion();
      });
    }
  }

  private navegarAPrimeraOpcion(): void {
    // Si estamos en la ruta raíz ('/') y tenemos items, navegamos al primero
    if (this.router.url === '/' && this.itemsMenu.length > 0) {
      const primeraRuta = this.itemsMenu[0].ruta;
      this.router.navigate([primeraRuta]);
    }
  }
}
