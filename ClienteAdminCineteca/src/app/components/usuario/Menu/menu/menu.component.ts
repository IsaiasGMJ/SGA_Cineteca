import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('carrito') carrito!: CarritoComponent;  // Referencia al carrito
  private apiUrl = 'http://localhost:4000/api/productos'; // Cambia esta URL según la configuración de tu backend

  constructor(private http: HttpClient, private productoService: ProductoService) {}

  productos: any[] = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 100,
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      precio: 200,
      imagen: 'https://via.placeholder.com/150'
    }
    // Puedes agregar más productos aquí
  ];

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
    this.carrito.addItem(producto);  // Agregar el producto al carrito
  }
}
