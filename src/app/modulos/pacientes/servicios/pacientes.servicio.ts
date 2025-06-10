import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../../../nucleo/modelos/paciente.modelo';
import { entorno } from '../../../../entornos/entorno';

@Injectable({
  providedIn: 'root'
})
export class PacientesServicio {
  private urlApi = entorno.urlApi;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de pacientes desde el backend.
   * @param criterio Opcional. El término de búsqueda para filtrar pacientes.
   * @returns Un Observable con un array de Pacientes.
   */
  listarPacientes(criterio: string = ''): Observable<Paciente[]> {
    const url = `${this.urlApi}/pacientes/listar/`;
    let params = new HttpParams();

    // Si se proporciona un criterio, se añade como parámetro en la URL
    if (criterio.trim()) {
      params = params.set('criterio', criterio);
    }

    return this.http.get<Paciente[]>(url, { params });
  }
}
