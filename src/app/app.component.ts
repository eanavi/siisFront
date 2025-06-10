import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '@modulos/auth/login/login.component';
import { SesionServicio } from '@compartido/servicios/sesion.servicio';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  servSesion = inject(SesionServicio);

  ngOnInit(): void {
    setInterval(() =>{
      this.servSesion.verficarToken()
    }, 30000);
  }
}
