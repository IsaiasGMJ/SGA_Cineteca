import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})
export class ListaProductosComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(
      data => {
        this.listProductos = data;
      },
      error => {
        console.error('Error al obtener productos:', error); // Log para errores
      }
    );
  }

  crearProducto(): void {
    console.log('Redirecting to crear producto...');
    this.router.navigate(['/producto/crear']);
  }

  // eliminarProducto(id: string): void {
  //   if (confirm('¿Desea eliminar el producto?')) {
  //     this.productoService.eliminarProducto(id).subscribe(
  //       res => {
  //         alert('Producto Eliminado');
  //         this.obtenerProductos(); // Recargar la lista después de eliminar
  //       },
  //       err => {
  //         alert('Error al eliminar');
  //       }
  //     );
  //   }
  // }
}