import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../model/producto.model';

import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';

import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-producto-component',
  standalone: true,
  imports: [
    FormsModule,
    AdminSidebarComponent,
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './actualizar-producto-component.component.html',
  styleUrls: ['./actualizar-producto-component.component.css'] // Se corrigió 'styleUrl' a 'styleUrls'
})
export class ActualizarProductoComponentComponent implements OnInit { // Se añadió OnInit
  producto: Producto = {
    _id: '',
    nombre: '',
    categoria: '',
    precio: 0,
    cantidad: 0,
    descripcion: '',
    imagen: '',
    estado: 'activo',
    fechaCreacion: new Date()
  };
  idProducto!: string;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProducto = id;
      this.obtenerProducto();
    } else {
      console.error('No se proporcionó un ID de producto en la URL.');
      // Maneja el caso de error donde no se obtiene un ID de producto
    }
  }

  obtenerProducto() {
    this.productoService.obtenerProducto(this.idProducto)
      .subscribe(producto => {
        this.producto = producto;
      });
  }

  actualizarProducto() {
    this.productoService.actualizarProducto(this.idProducto, this.producto) // Se pasa también el idProducto
      .subscribe(
        () => {
          this.router.navigate(['/inventario']);
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
  }
}
