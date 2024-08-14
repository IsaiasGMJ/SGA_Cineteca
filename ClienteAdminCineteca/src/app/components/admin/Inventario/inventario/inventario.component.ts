import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
import { ProductoService } from '../../../../services/producto.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterLink,
    AdminSidebarComponent
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {
  productos: any[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  // Obtener todos los productos
  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (response) => {
        this.productos = response;
        console.log('Productos cargados:', this.productos);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
}
