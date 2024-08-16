import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar el AuthService
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:4000/api/categorias'; // Cambia esta URL a la correcta

  constructor(
    private http: HttpClient,
    private authService: AuthService,
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

  // Obtener una categoria por ID
  obtenerCategoria(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Obtener todas las categorias
  obtenerCategorias(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.createHeaders() });
  }

  // Crear una nueva categoria
  crearCategoria(nombre: string, descripcion: string, imagen?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    return this.http.post(`${this.apiUrl}/crear`, formData, { headers: this.createHeaders() });
  }

  // Actualizar la categoria existente
  actualizarCategoria(id: string, nombre?: string, descripcion?: string, imagen?: File): Observable<any> {
    const formData: FormData = new FormData();
    if (nombre) formData.append('nombre', nombre);
    if (descripcion) formData.append('descripcion', descripcion);
    if (imagen) formData.append('imagen', imagen, imagen.name);

    return this.http.put(`${this.apiUrl}/actualizar/${id}`, formData, { headers: this.createHeaders() });
  }

  // Eliminar una categoria
  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`, { headers: this.createHeaders() });
  }
}
