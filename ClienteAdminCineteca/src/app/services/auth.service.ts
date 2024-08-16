import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:4001/api/auth/login'; // URL actualizada para tu API

  constructor(private http: HttpClient, private router: Router) { }


  // AuthService
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (response.jwtoken) {  // Cambiado de response.token a response.jwtoken
          console.log('Token recibido:', response.jwtoken); // Verifica que el token se recibe
          localStorage.setItem('token', response.jwtoken); // Cambiado de response.token a response.jwtoken
          console.log('Token almacenado en localStorage');
        }
      })
    );
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);  // Redirige al usuario a la página de login después del logout
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para crear los encabezados con el token
  createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': token ? token : ''
    });
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud'));
  }
  
}

