import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoService } from '../../../../services/producto.service';
import { CarritoComponent } from "../carrito/carrito.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, NavbarComponent, CarritoComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  private apiUrl = 'http://localhost:4000/api/productos'; // Cambia esta URL según la configuración de tu backend

  constructor(private http: HttpClient, private productoService: ProductoService) {}

  productos: any[] = [];

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe(
      data => {
        this.productos = data;
      },
      error => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  onCardClick(producto: any): void {
    console.log('Card clicked:', producto);
    // Aquí puedes agregar la lógica para manejar el click, por ejemplo, redireccionar a otra página, abrir un modal, etc.
  }
}
