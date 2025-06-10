import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AlmacenamientoServicio{
  private readonly TOKEN_KEY = 'jwt_token';

  guardarToken(token: string): void{
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  eliminarToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  obtenerRolDesdeToken(): string{
    const token = this.obtenerToken();
    if(!token) return '';

    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol || '';
    } catch {
      return '';
    }

  }
}
