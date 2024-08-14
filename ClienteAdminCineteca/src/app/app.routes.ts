import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { MenuComponent } from './components/usuario/Menu/menu/menu.component';
import { ConfirmarPedidoComponent } from './components/usuario/Menu/confirmar-pedido/confirmar-pedido.component';
import { CarritoComponent } from './components/usuario/Menu/carrito/carrito.component';
import { PedidosComponent } from './components/usuario/Cocina/pedidos/pedidos.component';
import { HistorialComponent } from './components/usuario/Cocina/historial/historial.component';
import { CierrecajaComponent } from './components/usuario/Caja/cierrecaja/cierrecaja.component';
import { InformeVentasComponent } from './components/admin/Contabilidad/informe-ventas/informe-ventas.component';
import { VentasComponent } from './components/admin/Contabilidad/ventas/ventas.component';
import { InventarioComponent } from './components/admin/Inventario/inventario/inventario.component';
import { UsuarioComponent } from './components/admin/usuario/usuario.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { CRUDproductosComponent } from './components/admin/crudproductos/crudproductos.component';

export const routes: Routes = [
    //rutas del auth
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    //====================RUTAS DEL ADMIN=======================
    {path: 'admin', component:AdminComponent },
    //Rutas contabilidad
    {path: 'ventas', component:VentasComponent },
    {path: 'informe-ventas', component:InformeVentasComponent },
    //Rutas inventario
    {path: 'inventario', component:InventarioComponent },
    //RUTAS DE PRODUCTOS CRUD
    {path: 'productos', component:CRUDproductosComponent },
    //Rutas Usuarios
    {path: 'usuarios', component:UsuarioComponent },
    //====================RUTAS DEL USUARIO=====================
    //rutas del Menu
    {path: 'menu', component: MenuComponent},
    {path: 'confirmacion', component: ConfirmarPedidoComponent },
    {path: 'carrito', component: CarritoComponent},
    //rutas Cocina
    {path: 'pedidos', component: PedidosComponent },
    {path: 'historial-pedidos', component: HistorialComponent},
    //caja
    {path: 'Cierre-caja', component:CierrecajaComponent },
];
