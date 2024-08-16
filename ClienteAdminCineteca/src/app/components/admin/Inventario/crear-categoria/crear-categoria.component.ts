import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../../services/categoria.service';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AdminSidebarComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {
  categoria: any = {
    nombre: '',
    descripcion: '',
    imagen: null,
    imagenUrl: null
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoria.imagen = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.categoria.imagenUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('nombre', this.categoria.nombre);
    formData.append('descripcion', this.categoria.descripcion);
    if (this.categoria.imagen) {
      formData.append('imagen', this.categoria.imagen, this.categoria.imagen.name);
    }

    // Llamar al servicio con FormData completo
    this.categoriaService.crearCategoria(formData).subscribe(
      () => {
        this.toastr.success('Categoría creada con éxito');
        this.router.navigate(['inventario/categorias']);
      },
      (error) => {
        console.error('Error al crear la categoría:', error);
        this.toastr.error('Error al crear la categoría');
      }
    );
  }
}
