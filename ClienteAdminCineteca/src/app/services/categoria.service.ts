import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.model'; // Importa la interfaz
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:4000/api/categorias'; // URL de tu API

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Método para crear los encabezados con el token
  private createHeaders(includeContentType: boolean = true): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      const headersConfig: { [header: string]: string | string[] } = {
        'x-auth-token': token // Usa el encabezado 'x-auth-token'
      };
      
      // Solo agregar 'Content-Type' si no se está usando FormData
      if (includeContentType) {
        headersConfig['Content-Type'] = 'application/json';
      }

      return new HttpHeaders(headersConfig);
    } else {
      console.error('Token no disponible');
      this.router.navigate(['/login']); // Redirige al login si no hay token
      throw new Error("Token no disponible");
    }
  }

  // Obtener una categoría por ID
  obtenerCategoria(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Obtener todas las categorías
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl, { headers: this.createHeaders() });
  }

  // Crear una nueva categoría (FormData, sin 'Content-Type')
  crearCategoria(categoria: FormData): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria, { headers: this.createHeaders(false) });
  }

  // Actualizar una categoría existente (FormData, sin 'Content-Type')
  actualizarCategoria(id: string, categoria: FormData): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria, { headers: this.createHeaders(false) });
  }

  // Eliminar una categoría
  eliminarCategoria(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }
}
