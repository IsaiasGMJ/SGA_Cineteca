import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../../../model/producto.model';
import { CategoriaService } from '../../../../services/categoria.service';
import { ProductoService } from '../../../../services/producto.service';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [
    FormsModule,
    AdminSidebarComponent,
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './actualizar-producto-component.component.html',
  styleUrls: ['./actualizar-producto-component.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  producto: Producto = {
    _id: '',
    nombre: '',
    categoria: '', // Asumiendo que `categoria` es un string. Si es un número, cambia esto a `0`.
    precio: 0,
    cantidad: 0,
    descripcion: '',
    imagen: '',
    estado: 'activo',
    fechaCreacion: new Date()
  };
  idProducto!: string;
  selectedImage?: File;
  categorias: { id: string, nombre: string }[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProducto = id;
      this.obtenerProducto();
    } else {
      console.error('No se proporcionó un ID de producto en la URL.');
    }

    this.obtenerCategorias();
  }

  obtenerProducto() {
    this.productoService.obtenerProducto(this.idProducto)
      .subscribe(producto => {
        this.producto = producto;
      });
  }

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias()
      .subscribe(categorias => {
        this.categorias = categorias;
      });
  }

  actualizarCategoria(event: any) {
    this.producto.categoria = event.target.value;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  actualizarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.producto.nombre || '');
    formData.append('categoriaId', this.producto.categoria.toString()); // Asegúrate de que esto sea una cadena si `categoria` es una cadena
    formData.append('precio', this.producto.precio ? this.producto.precio.toString() : '0');
    formData.append('cantidad', this.producto.cantidad ? this.producto.cantidad.toString() : '0');
    formData.append('descripcion', this.producto.descripcion || '');
    formData.append('estado', this.producto.estado || '');

    // Verifica si fechaCreacion es un objeto Date
    if (this.producto.fechaCreacion instanceof Date) {
      formData.append('fechaCreacion', this.producto.fechaCreacion.toISOString());
    } else {
      formData.append('fechaCreacion', new Date().toISOString());
    }

    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage, this.selectedImage.name);
    } else {
      formData.append('imagen', this.producto.imagen || '');
    }

    this.productoService.actualizarProducto(this.idProducto, formData)
      .subscribe({
        next: () => {
          this.toastr.success('Producto actualizado con éxito', 'Actualización Exitosa');
          this.router.navigate(['/inventario']);
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          this.toastr.error('Error al actualizar el producto. Por favor, verifica los datos ingresados.', 'Error');
        }
      });
  }
}
