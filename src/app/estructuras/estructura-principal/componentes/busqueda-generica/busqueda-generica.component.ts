import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Persona } from '@nucleo/modelos/persona.modelo';
import { BusquedaService } from '@compartido/servicios/busqueda.service';


const MODS_MATERIAL = [MatInputModule, MatFormFieldModule,
  MatButtonModule, MatTableModule, MatIconModule, MatProgressSpinnerModule];


@Component({
  selector: 'app-busqueda-generica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MODS_MATERIAL ],
  templateUrl: './busqueda-generica.component.html',
  styleUrl: './busqueda-generica.component.css'
})
export class BusquedaGenericaComponent implements OnInit {
  criterio = new FormControl('');
  resultados: Persona[] = [];
  cargando :boolean = false

  //Columas que se mostraran en la tabla

  columnasMostradas: string[] = ['ci', 'nombreCompleto', 'fecha_nacimiento', 'sexo', 'acciones'];
  constructor(private busquedaServicio: BusquedaService) {}

  ngOnInit(): void {
      //Opcional: busqueda inicial
      //this.buscar
  }

  buscar():void{
    if (this.criterio.value) {
      this.cargando = true;
      this.resultados = [];
      this.busquedaServicio.buscarPersonas(this.criterio.value).subscribe({
        next: (data) =>{
          this.resultados = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al buscar', err);
          this.cargando = false;
        }
      })
     }
  }

  limpiar():void{
    this.criterio.setValue('');
    this.resultados = [];
  }

}
