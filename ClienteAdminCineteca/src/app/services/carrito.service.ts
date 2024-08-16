// src/app/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = 'http://localhost:4000/api/carrito'; // Cambia esta URL a la correcta

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Método para crear los encabezados con el token
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token  // Asegúrate de que el encabezado sea 'x-auth-token'
      });
    } else {
      console.error('Token no disponible');
      this.router.navigate(['/login']); // Redirige al login si no hay token
      throw new Error("Token no disponible");
    }
  }

  // Enviar el pedido
  enviarPedido(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vender`, payload, { headers: this.createHeaders() });
  }
}
