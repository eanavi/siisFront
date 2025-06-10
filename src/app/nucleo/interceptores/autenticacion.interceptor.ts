import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlmacenamientoServicio } from  './../servicios/almacenamiento.servicio';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionInterceptor implements HttpInterceptor {
  constructor(private almacenamiento: AlmacenamientoServicio) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.almacenamiento.obtenerToken();
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}

export const autenticacionIterceptorFn: HttpInterceptorFn = (req, next) => {
  const interceptor = inject(AutenticacionInterceptor);
  return interceptor.intercept(req, { handle : next } as any )
}
