import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink,RouterOutlet],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  cartItems: any[] = [];
  isSidebarActive: boolean = false;
  private apiUrl = 'http://localhost:4000/api/ventas'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Método para agregar un artículo al carrito
  addItem(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.cantidad++;
    } else {
      this.cartItems.push({ ...item, cantidad: 1 });
    }
  }

  // Método para eliminar un artículo del carrito
  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
  }

  // Calcular el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  // Método para proceder al pago
  proceedToCheckout() {
    const userId = '123456'; // Aquí deberías obtener el userId dinámicamente según tu lógica de autenticación
  
    this.http.post('http://localhost:4000/api/ventas/vender', { userId }).subscribe({
      next: (response) => {
        console.log('Venta realizada con éxito', response);
        alert('Compra realizada con éxito');
        this.cartItems = []; // Vaciar el carrito después de la compra
        this.toggleSidebar();
      },
      error: (error) => {
        console.error('Error al realizar la compra', error);
        alert('Error al realizar la compra: ' + error.error.message);
      }
    });
  }
  

  // Toggle para el sidebar
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
