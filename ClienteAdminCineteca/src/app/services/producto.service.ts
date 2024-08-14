import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) { }

  // Obtener curso por ID
  obtenerProducto(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Obtener todos los cursos
  obtenerProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear un nuevo producto
  crearProducto(nombre: string, categoria: string, precio: number, cantidad: number, descripcion: string, imagen?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('categoria', categoria);
    formData.append('precio', precio.toString());
    formData.append('cantidad', cantidad.toString());
    formData.append('descripcion', descripcion);
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    return this.http.post(`${this.apiUrl}/crear`, formData);
  }

  // Actualizar un producto existente
  actualizarProducto(id: string, nombre?: string, categoria?: string, precio?: number, descripcion?: string, cantidad?: number, imagen?: File): Observable<any> {
    const formData: FormData = new FormData();
    if (nombre) formData.append('nombre', nombre);
    if (categoria) formData.append('categoria', categoria);
    if (precio) formData.append('precio', precio.toString());
    if (descripcion) formData.append('descripcion', descripcion);
    if (cantidad) formData.append('cantidad', cantidad.toString());
    if (imagen) formData.append('imagen', imagen, imagen.name);

    return this.http.put(`${this.apiUrl}/actualizar/${id}`, formData);
  }

  // Actualizar el estado de un producto
  cambiarEstadoProducto(id: string, estado: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { estado });
  }

  // Actualizar el stock de un producto
  actualizarStockProducto(id: string, cantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-stock/${id}`, { cantidad });
  }

  // Eliminar un producto
  // eliminarProducto(id: string): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  // }

}
