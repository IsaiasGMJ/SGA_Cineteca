import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../model/carrito.model';
import { Venta } from '../model/venta.model';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {
  private apiUrl = 'https://localhost:4001/api/carrito'; // Cambia esta URL a la correcta

  constructor(private http: HttpClient) {}

  // Obtener el carrito del usuario
  obtenerCarrito(userId: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}/usuario/${userId}`);
  }

  // Agregar producto al carrito
  agregarProductoAlCarrito(userId: string, productoId: string, cantidad: number): Observable<Carrito> {
    const body = { userId, productoId, cantidad };
    return this.http.post<Carrito>(`${this.apiUrl}/carrito/agregar`, body);
  }

  // Eliminar producto del carrito
  eliminarProductoDelCarrito(carritoId: string, productoId: string): Observable<Carrito> {
    const body = { productoId };
    return this.http.delete<Carrito>(`${this.apiUrl}/carrito/eliminar/${carritoId}`, { body });
  }

  // Realizar venta (Finalizar compra)
  realizarVenta(userId: string): Observable<Venta> {
    const body = { userId };
    return this.http.post<Venta>(`${this.apiUrl}/ventas/finalizar`, body);
  }

  // Obtener todas las ventas
  obtenerVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}/ventas`);
  }

  // Obtener una venta específica por ID
  obtenerVentaPorId(ventaId: string): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/ventas/${ventaId}`);
  }
}
