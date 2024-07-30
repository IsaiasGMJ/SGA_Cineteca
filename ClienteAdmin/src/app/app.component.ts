import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Componentes
import { CrearProductoComponent } from './modules/inventory-management/components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './modules/inventory-management/components/editar-producto/editar-producto.component';
import { ListaProductosComponent } from './modules/inventory-management/components/lista-productos/lista-productos.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    CrearProductoComponent,
    EditarProductoComponent,
    ListaProductosComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cliente';
}
