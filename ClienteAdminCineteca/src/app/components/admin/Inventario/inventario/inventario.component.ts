import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
import { ProductoService } from '../../../../services/producto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterLink,
    AdminSidebarComponent,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'precio', 'descripcion', 'cantidad', 'imagen', 'acciones'];
  dataSource = new MatTableDataSource<any>(); // Ajusta el tipo según tu interfaz de producto

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  editarProduto(id: string) {
    this.router.navigate(['/inventario/editarProducto', id]);
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (response) => {
        this.dataSource.data = response; // Asegúrate de que response sea del tipo adecuado
        console.log('Productos cargados:', this.dataSource.data);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
}
