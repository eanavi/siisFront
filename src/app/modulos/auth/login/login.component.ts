import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionServicio } from '@nucleo/servicios/autenticacion.servicio';
import { NotificacionServicio } from '@compartido/servicios/notificacion.servicio';


const MODS_MATERIAL = [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ...MODS_MATERIAL],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private autenticacionServicio = inject(AutenticacionServicio);
  private notificacionServicio = inject(NotificacionServicio);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.notificacionServicio.mostrarError('Por favor, completa todos los campos.');
      return;
    }

    const { username, password } = this.form.value;
    this.autenticacionServicio.login(username!, password!).subscribe({
      next: () => {
        this.autenticacionServicio.obtenerRutasPorRol().subscribe({
          next: (rutas) => {
            if (rutas && rutas.length > 0) {
              //this.router.navigate([rutas[0]]); // Redirige a la primera ruta
              this.router.navigate(['/principal']);
            } else {
              this.notificacionServicio.mostrarError('No se encontraron rutas para el rol.');
            }
          },
          error: () => {
            this.notificacionServicio.mostrarError('Error al obtener las rutas del usuario.');
          },
        });
      },
      error: () => {
        this.notificacionServicio.mostrarError('Credenciales incorrectas.');
      },
    });
  }
}
