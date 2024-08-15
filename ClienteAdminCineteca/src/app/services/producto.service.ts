// src/app/services/producto.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  // Crear un nuevo producto con FormData para manejar archivos
  crearProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, producto);
  }

  // Actualizar un producto existente
  actualizarProducto(id: string, producto: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto); // Cambiado para actualizar un producto por ID
  }

  // Actualizar el estado de un producto
  cambiarEstadoProducto(id: string, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { estado });
  }

  actualizarStockProducto(id: string, cantidad: number): Observable<any> {
    const body = { cantidad };
    return this.http.patch<any>(`${this.apiUrl}/stock/${id}`, body);
  }

  // Eliminar un producto
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener categorías
  obtenerCategorias(): Observable<{ id: string, nombre: string }[]> {
    return this.http.get<{ id: string, nombre: string }[]>(`${this.apiUrl}/categorias`);
  }}