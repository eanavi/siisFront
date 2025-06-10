import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Paciente } from '../../nucleo/modelos/paciente.modelo';
import { PacientesServicio } from './servicios/pacientes.servicio';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, DatePipe, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatTableModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule
  ],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  criterio = new FormControl('');
  pacientes: Paciente[] = [];
  cargando = false;

  // Definimos las columnas que nuestra tabla va a mostrar
  columnasMostradas: string[] = ['id_paciente', 'ci', 'nombreCompleto', 'telefono', 'acciones'];

  constructor(private pacientesServicio: PacientesServicio) { }

  ngOnInit(): void {
    // Realizamos una búsqueda inicial para mostrar todos los pacientes
    this.buscar();
  }

  buscar(): void {
    this.cargando = true;
    this.pacientes = [];
    const criterioValor = this.criterio.value || '';

    this.pacientesServicio.listarPacientes(criterioValor).subscribe({
      next: (data) => {
        this.pacientes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al listar pacientes:', err);
        this.cargando = false;
      }
    });
  }

  limpiar(): void {
    this.criterio.setValue('');
    this.buscar(); // Vuelve a buscar para mostrar la lista completa
  }

  // Métodos para las acciones de la tabla
  verHistorial(idPaciente: number): void {
    console.log(`Navegar al historial del paciente con ID: ${idPaciente}`);
    // Aquí irá la lógica de navegación: this.router.navigate(['/historial', idPaciente]);
  }

  iniciarConsulta(idPaciente: number): void {
    console.log(`Iniciar consulta externa para el paciente con ID: ${idPaciente}`);
    // Aquí irá la lógica de navegación: this.router.navigate(['/consulta-externa', idPaciente]);
  }
}
