import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../../../model/categoria.model';
import { CategoriaService } from '../../../../services/categoria.service';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [
    FormsModule,
    AdminSidebarComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  categoria: Categoria = {
    id: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    fechaCreacion: new Date()
  };
  idCategoria!: string;
  selectedImage?: File;

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idCategoria = id;
      this.obtenerCategoria();
    } else {
      console.error('No se proporcionó un ID de categoría en la URL.');
    }
  }

  obtenerCategoria() {
    this.categoriaService.obtenerCategoria(this.idCategoria)
      .subscribe(categoria => {
        this.categoria = categoria;
      });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  actualizarCategoria() {
    const formData = new FormData();
    formData.append('nombre', this.categoria.nombre || '');
    formData.append('descripcion', this.categoria.descripcion || '');
    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage, this.selectedImage.name);
    } else {
      formData.append('imagen', this.categoria.imagen || '');
    }

    this.categoriaService.actualizarCategoria(this.idCategoria, formData)
      .subscribe({
        next: () => {
          this.toastr.success('Categoría actualizada con éxito', 'Actualización Exitosa');
          this.router.navigate(['/inventario/categorias']);
        },
        error: (error) => {
          console.error('Error al actualizar la categoría:', error);
          this.toastr.error('Error al actualizar la categoría. Por favor, verifica los datos ingresados.', 'Error');
        }
      });
  }

  cancelarEdicion() {
    this.router.navigate(['/inventario/categorias']);
  }
}
