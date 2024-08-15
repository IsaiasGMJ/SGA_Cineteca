import { Component, Output, EventEmitter } from '@angular/core';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Producto } from '../../../../model/producto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    RouterModule,
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
  nuevoProducto: Producto = { nombre: '', categoria: '', precio: 0, cantidad: 0 };
  categorias: any[] = [];
  imagenSeleccionada: File | null = null;

  @Output() productoCreado = new EventEmitter<any>();

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (response) => {
        this.categorias = response;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.imagenSeleccionada = event.target.files[0];
  }

  crearProducto(): void {
    const formData = new FormData();

    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('categoria', this.nuevoProducto.categoria);
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('cantidad', this.nuevoProducto.cantidad.toString());

    if (this.nuevoProducto.descripcion) {
      formData.append('descripcion', this.nuevoProducto.descripcion);
    }
    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.productoService.crearProducto(formData).subscribe(
      (response) => {
        this.toastr.success('Producto agregado con éxito', 'Éxito');
        this.productoCreado.emit(response); // Emitir el producto creado para que el padre lo maneje si es necesario.
        this.router.navigate(['/inventario']);
},
      (error) => {
        this.toastr.error('Error al agregar el producto', 'Error');
        console.error('Error al crear producto:', error);
      }
    );
  }
}
