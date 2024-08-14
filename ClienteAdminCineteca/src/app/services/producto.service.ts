// src/app/services/producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model'; // Asegúrate de importar la interfaz

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'https://localhost:4001/api/productos'; // Cambia esta URL a la correcta

  constructor(private http: HttpClient) { }

  // Obtener un producto por ID
  obtenerProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Obtener todos los productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/`, producto);
  }

  // Actualizar un producto existente
  actualizarProducto(idProducto: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${producto._id}`, producto);
  }

  // Actualizar el estado de un producto
  cambiarEstadoProducto(id: string, estado: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { estado });
  }

  // Actualizar el stock de un producto
  actualizarStockProducto(id: string, cantidad: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/actualizar-stock/${id}`, { cantidad });
  }

  // Eliminar un producto
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
