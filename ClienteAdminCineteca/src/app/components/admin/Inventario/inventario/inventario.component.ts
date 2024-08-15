import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../../services/categoria.service';
import { ProductoService } from '../../../../services/producto.service';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterLink,
    AdminSidebarComponent,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'precio', 'descripcion', 'cantidad', 'imagen', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  productos: any[] = [];
  categorias: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  showStockUpdateForm: boolean = false;
  stockQuantity: number = 0;
  productIdToUpdate: string | null = null;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    } else {
      console.warn('Paginator not initialized');
    }
  }

  crearProducto(){
    this.router.navigate(['inventario/crearProducto']);
  }

  editarProducto(id: string) {
    this.router.navigate(['/inventario/editarProducto', id]);
  }
  
  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (response) => {
        this.dataSource.data = response;
        console.log('Productos cargados:', this.dataSource.data);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (response) => {
        this.categorias = response;
        console.log('Categorías cargadas:', this.categorias);
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  openStockUpdateForm(productId: string): void {
    this.productIdToUpdate = productId;
    this.showStockUpdateForm = true;
  }

  closeStockUpdateForm(): void {
    this.showStockUpdateForm = false;
    this.productIdToUpdate = null;
    this.stockQuantity = 0;
  }

  updateStock(): void {
    if (this.productIdToUpdate) {
      this.productoService.actualizarStockProducto(this.productIdToUpdate, this.stockQuantity).subscribe({
        next: (response) => {
          this.toastr.success('Stock actualizado con éxito', 'Éxito');
          this.obtenerProductos();
          this.closeStockUpdateForm();
        },
        error: (error) => {
          console.error('Error al actualizar stock:', error);
          this.toastr.error('Hubo un error al actualizar el stock', 'Error');
        }
      });
    }
  }

  eliminarProducto(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: (response) => {
          this.toastr.success(response.msg, 'Éxito');
          this.obtenerProductos();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.toastr.error('Hubo un error al eliminar el producto', 'Error');
        }
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
