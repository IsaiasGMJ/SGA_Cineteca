import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../model/producto.model';

import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-producto-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './actualizar-producto-component.component.html',
  styleUrl: './actualizar-producto-component.component.css'
})
export class ActualizarProductoComponentComponent {
  producto: Producto
    = {
      _id: '',  // Inicializar con valores predeterminados
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
    this.productoService.actualizarProducto(this.producto)
      .subscribe(
        () => {
          // Redirigir a la lista de productos o mostrar un mensaje de éxito
          this.router.navigate(['/productos']);
        },
        error => {
          console.error('Error al actualizar el producto:', error);
          // Mostrar un mensaje de error al usuario
        }
      );
  }
}
