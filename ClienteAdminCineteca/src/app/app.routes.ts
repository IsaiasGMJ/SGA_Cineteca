import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { InformeVentasComponent } from './components/admin/Contabilidad/informe-ventas/informe-ventas.component';
import { VentasComponent } from './components/admin/Contabilidad/ventas/ventas.component';
import { CrudcategoriasComponent } from './components/admin/crudcategorias/crudcategorias.component';
import { InventarioComponent } from './components/admin/Inventario/inventario/inventario.component';
import { UsuarioComponent } from './components/admin/usuario/usuario.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CierrecajaComponent } from './components/usuario/Caja/cierrecaja/cierrecaja.component';
import { HistorialComponent } from './components/usuario/Cocina/historial/historial.component';
import { PedidosComponent } from './components/usuario/Cocina/pedidos/pedidos.component';
import { CarritoComponent } from './components/usuario/Menu/carrito/carrito.component';
import { ConfirmarPedidoComponent } from './components/usuario/Menu/confirmar-pedido/confirmar-pedido.component';
import { MenuComponent } from './components/usuario/Menu/menu/menu.component';
import { ActualizarProductoComponent } from './components/admin/Inventario/actualizar-producto-component/actualizar-producto-component.component';
import { CrearProductoComponent } from './components/admin/Inventario/crear-producto/crear-producto.component';
import { CategoriasComponent } from './components/admin/Inventario/categorias/categorias.component';
import { CrearCategoriaComponent } from './components/admin/Inventario/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './components/admin/Inventario/editar-categoria/editar-categoria.component';

export const routes: Routes = [

    //rutas del auth
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    //====================RUTAS DEL ADMIN=======================
    { path: 'admin', redirectTo: 'inventario', pathMatch: 'full' },

    //Rutas contabilidad
    { path: 'ventas', component: VentasComponent },
    { path: 'informe-ventas', component: InformeVentasComponent },

    //Rutas inventario
    { path: 'inventario', component: InventarioComponent },
    { path: 'inventario/crearProducto', component: CrearProductoComponent},
    { path: 'inventario/editarProducto/:id', component: ActualizarProductoComponent },
    { path: 'inventario/categorias', component: CategoriasComponent },
    { path: 'inventario/categorias/crearCategoria', component: CrearCategoriaComponent},
    { path: 'inventario/categorias/editarCategoria/:id', component: EditarCategoriaComponent},
    //RUTAS DE PRODUCTOS CRUD
    // Rutas de categorias
    { path: 'categorias', component: CrudcategoriasComponent },
    //Rutas Usuarios
    { path: 'usuarios', component: UsuarioComponent },

    //====================RUTAS DEL USUARIO=====================

    //rutas del Menu
    { path: 'menu', component: MenuComponent },
    { path: 'confirmacion', component: ConfirmarPedidoComponent },
    { path: 'carrito', component: CarritoComponent },

    //rutas Cocina
    { path: 'pedidos', component: PedidosComponent },
    { path: 'historial-pedidos', component: HistorialComponent },

    //caja
    { path: 'Cierre-caja', component: CierrecajaComponent },
];
