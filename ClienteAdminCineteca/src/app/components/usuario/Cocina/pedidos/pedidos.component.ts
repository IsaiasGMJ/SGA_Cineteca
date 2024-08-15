import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  standalone:true,
  imports:[CommonModule,RouterOutlet,RouterLink,RouterModule, NavbarComponent],
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];
  private apiUrl = 'http://localhost:4000/api/ventas'; // Cambia esta URL según la configuración de tu backend

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${this.apiUrl}/ventas`).subscribe(
      data => {
        this.pedidos = data;
      },
      error => {
        console.error('Error al obtener los pedidos', error);
      }
    );
  }
}
