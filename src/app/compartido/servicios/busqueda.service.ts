import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Persona } from '@nucleo/modelos/persona.modelo';
import { entorno } from 'src/entornos/entorno';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  private urlApi = entorno.urlApi;
  constructor(private http: HttpClient) { }

  buscarPersonas(criterio: string): Observable<Persona[]>{
    console.log(`Buscando personas con el criterio : ${criterio}`);

    return this.http.get<{ items : Persona[] }>(`${this.urlApi}/personas/buscar/${criterio}`)
    .pipe(
      map(respuesta => respuesta.items)
    )
    ;
    //const datosSimulados: Persona[] =[
    //  { "tipo": "E", "ci": "548732", "paterno": "Fernández", "materno": "Pérez", "nombres": "Juan Antonio", "fecha_nacimiento": "1990-01-01", "sexo": "M", "id_persona": "123e4567-e89b-12d3-a456-426614174000", "procedencia": "propio" },
    //  { "tipo": "P", "ci": "123456", "paterno": "García", "materno": "López", "nombres": "Maria Elena", "fecha_nacimiento": "1985-05-20", "sexo": "F", "id_persona": "987e6543-e21b-12d3-a456-426614174001", "procedencia": "externo" }
    //];

    //return of(datosSimulados);
  }
}
