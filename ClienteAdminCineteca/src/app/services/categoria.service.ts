import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'https://localhost:4001/api/categorias'; // Cambia esta URL a la correcta
  
  constructor(private http: HttpClient) { }
  
  // Obtener una categoria por ID
  obtenerCategoria(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Obterner todas las categorias
  obtenerCategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear una nueva categoria
  crearCategoria(nombre: string, descripcion: string, imagen?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    return this.http.post(`${this.apiUrl}/crear`, formData);
  }  

  // Actualizar la categoria existente
  actualizarCategoria(id: string, nombre?: string, descripcion?: string, imagen?: File): Observable<any> {
    const formData: FormData = new FormData();
    if (nombre) formData.append('nombre', nombre);
    if (descripcion) formData.append('descripcion', descripcion);
    if (imagen) formData.append('imagen', imagen, imagen.name);

    return this.http.put(`${this.apiUrl}/actualizar/${id}`, formData);
  }

  // Eliminar una categoria
  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}
