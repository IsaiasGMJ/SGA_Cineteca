import { Routes, RouterModule} from '@angular/router';

// Componentes
import { CrearProductoComponent } from './modules/inventory-management/components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './modules/inventory-management/components/editar-producto/editar-producto.component';
import { ListaProductosComponent } from './modules/inventory-management/components/lista-productos/lista-productos.component';

export const routes: Routes = [
    { path: 'producto/lista', component: ListaProductosComponent },
    { path: 'producto/crear', component: CrearProductoComponent },
    { path: 'producto/:id', component: EditarProductoComponent },
    { path: '**', redirectTo: 'producto/lista', pathMatch: 'full' }
];
export class AppRoutingModule { }

