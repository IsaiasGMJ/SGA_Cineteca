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
export class MenuComponent implements OnInit {
  @ViewChild('carrito') carrito!: CarritoComponent;  // Referencia al carrito
  private apiUrl = 'http://localhost:4000/api/productos'; // Cambia esta URL según la configuración de tu backend

  productos: any[] = [];

  constructor(private http: HttpClient, private productoService: ProductoService) {}

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

  onCardClick(producto: any): void {
    this.carrito.addItem(producto);  // Agregar el producto al carrito
  }

  enviarPedido(): void {
    this.carrito.proceedToCheckout();  // Llamar a la función enviarPedido() del carrito
  }
}
