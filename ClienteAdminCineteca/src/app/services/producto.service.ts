import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:4000/api/productos'; // Cambia esta URL a la correcta

  constructor(
    private http: HttpClient,
    private router: Router) { }

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

  // Obtener un producto por ID
  obtenerProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Obtener todos los productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl, { headers: this.createHeaders() });
  }

  // Crear un nuevo producto con FormData para manejar archivos
  crearProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, producto, { headers: this.createHeaders() });
  }

  // Actualizar un producto existente
  actualizarProducto(id: string, producto: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto, { headers: this.createHeaders() });
  }

  // Actualizar el estado de un producto
  cambiarEstadoProducto(id: string, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { estado }, { headers: this.createHeaders() });
  }

  // Actualizar el stock de un producto
  actualizarStockProducto(id: string, cantidad: number): Observable<any> {
    const body = { cantidad };
    return this.http.patch<any>(`${this.apiUrl}/stock / ${id}`, body, { headers: this.createHeaders() });
  }

  // Eliminar un producto
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Obtener categorías
  obtenerCategorias(): Observable<{ id: string, nombre: string }[]> {
    return this.http.get<{ id: string, nombre: string }[]>(`${this.apiUrl}/categorias`, { headers: this.createHeaders() });
  }
}