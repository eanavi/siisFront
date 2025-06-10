import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap, map } from "rxjs";
import { AlmacenamientoServicio } from './almacenamiento.servicio';
import { entorno } from "src/entornos/entorno";
import { ItemMenu } from '@nucleo/modelos/menu.modelo';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionServicio{
  private http = inject(HttpClient);
  private almacenamiento = inject(AlmacenamientoServicio);
  private apiUrl = entorno.urlApi;

  public itemsMenu: ItemMenu[] = [];


  login(username: string, password: string): Observable<{ access_token: string; token_type: string }> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http
      .post<{ access_token: string; token_type: string }>(`${this.apiUrl}/auth/login`, formData)
      .pipe(
        tap((response) => {
          this.almacenamiento.guardarToken(response.access_token);
        })
      );
  }

  obtenerMenuPorRol(rol:string): Observable<ItemMenu[]>{
    const url = `${this.apiUrl}/menus/rol/${rol}`;

    return this.http.get<any[]>(url).pipe(
      map((items) =>
        items.map((item) => ({
          nombreMenu: item.nombre_menu,
          ruta: item.ruta,
          icono: item.icono,
          orden: item.orden,
          metodo: item.metodo,
        }))
      )
    );
  }

  obtenerRutasPorRol(): Observable<string[]>{
    const rol = this.almacenamiento.obtenerRolDesdeToken();
    return this.http.get<string[]>(`${this.apiUrl}/menus/rol/${rol}`);
  }

  estaAutenticado():boolean{
    return !!this.almacenamiento.obtenerToken();
  }

  logout(){
    this.almacenamiento.eliminarToken()
  }
}
