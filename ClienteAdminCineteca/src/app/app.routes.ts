import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { InformeVentasComponent } from './components/admin/Contabilidad/informe-ventas/informe-ventas.component';
import { VentasComponent } from './components/admin/Contabilidad/ventas/ventas.component';
import { CrudcategoriasComponent } from './components/admin/crudcategorias/crudcategorias.component';
import { CRUDproductosComponent } from './components/admin/crudproductos/crudproductos.component';
import { InventarioComponent } from './components/admin/Inventario/inventario/inventario.component';
<<<<<<< HEAD
import { AdminComponent } from './components/admin/admin/admin.component';
import { CrudcategoriasComponent } from './components/admin/crudcategorias/crudcategorias.component';
import { UsuarioComponent } from './components/admin/usuario/usuario.component';
import { ActualizarProductoComponentComponent } from './components/admin/Inventario/actualizar-producto-component/actualizar-producto-component.component';
=======
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
>>>>>>> 76d3b619ecc44c7ccbac7960dc27f50e141dd223

export const routes: Routes = [

    //rutas del auth
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    //====================RUTAS DEL ADMIN=======================
    { path: 'admin', component: AdminComponent },

    //Rutas contabilidad
    { path: 'ventas', component: VentasComponent },
    { path: 'informe-ventas', component: InformeVentasComponent },

    //Rutas inventario
    { path: 'inventario', component: InventarioComponent },
    { path: 'inventario/crearProducto', component: CrearProductoComponent},
    { path: 'inventario/editarProducto/:id', component: ActualizarProductoComponent },
    //RUTAS DE PRODUCTOS CRUD
<<<<<<< HEAD
    // {path: 'productos', component: InventarioComponent },
=======
    { path: 'productos', component: CRUDproductosComponent },
>>>>>>> 76d3b619ecc44c7ccbac7960dc27f50e141dd223
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
