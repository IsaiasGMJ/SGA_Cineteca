import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
import { Categoria } from '../../../../model/categoria.model'; // Import the interface
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    AdminSidebarComponent,
    FormsModule
  ],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'imagen', 'fechaCreacion', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  formVisible: boolean = false;
  editingCategoria: Categoria | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    } else {
      console.warn('Paginator not initialized');
    }
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (response) => {
        this.dataSource.data = response;
        console.log('Categorías cargadas:', this.dataSource.data);
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearCategoria(): void {
    this.router.navigate(['inventario/categorias/crearCategoria']);
  }

  editarCategoria(id: string): void {
    this.router.navigate(['inventario/categorias/editarCategoria', id]);
  }

  guardarCategoria(): void {
    if (this.editingCategoria) {
      const formData = new FormData();
      formData.append('nombre', this.editingCategoria.nombre);
      formData.append('descripcion', this.editingCategoria.descripcion || '');
      if (this.editingCategoria.imagen instanceof File) {
        formData.append('imagen', this.editingCategoria.imagen, this.editingCategoria.imagen.name);
      }

      this.categoriaService.actualizarCategoria(this.editingCategoria.id, formData).subscribe(
        () => {
          this.toastr.success('Categoría actualizada con éxito');
          this.obtenerCategorias(); // Refresh the list
          this.formVisible = false; // Hide the form
        },
        (error) => {
          console.error('Error al actualizar la categoría:', error);
          this.toastr.error('Error al actualizar la categoría');
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.formVisible = false; // Hide the form
  }

  eliminarCategoria(id: string): void {
    this.categoriaService.eliminarCategoria(id).subscribe(
      () => {
        this.toastr.success('Categoría eliminada con éxito');
        this.obtenerCategorias(); // Refresh the list
      },
      (error) => {
        console.error('Error al eliminar la categoría:', error);
        this.toastr.error('Error al eliminar la categoría');
      }
    );
  }
}
