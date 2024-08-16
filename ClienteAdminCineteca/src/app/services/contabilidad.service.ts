import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../model/carrito.model';
import { Venta } from '../model/venta.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
  export class ContabilidadService {
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
    // Obtener el carrito del usuario
    obtenerCarrito(userId: string): Observable<Carrito> {
      return this.http.get<Carrito>(`${this.apiUrl}/usuario/${userId}`, { headers: this.createHeaders() });
    }

    // Agregar producto al carrito
    agregarProductoAlCarrito(userId: string, productoId: string, cantidad: number): Observable<Carrito> {
      const body = { userId, productoId, cantidad };
      return this.http.post<Carrito>(`${this.apiUrl}/carrito/agregar`, body, { headers: this.createHeaders() });
    }

    // Eliminar producto del carrito
    eliminarProductoDelCarrito(carritoId: string, productoId: string): Observable<Carrito> {
      const body = { productoId };
      return this.http.delete<Carrito>(`${this.apiUrl}/carrito/eliminar/${carritoId}`, { headers: this.createHeaders(), body });
    }

    // Realizar venta (Finalizar compra)
    realizarVenta(userId: string): Observable<Venta> {
      const body = { userId };
      return this.http.post<Venta>(`${this.apiUrl}/ventas/finalizar`, body, { headers: this.createHeaders() });
    }

    // Obtener todas las ventas
    obtenerVentas(): Observable<Venta[]> {
      return this.http.get<Venta[]>(`${this.apiUrl}/ventas`, { headers: this.createHeaders() });
    }

    // Obtener una venta específica por ID
    obtenerVentaPorId(ventaId: string): Observable<Venta> {
      return this.http.get<Venta>(`${this.apiUrl}/ventas/${ventaId}`, { headers: this.createHeaders() });
    }
  }
