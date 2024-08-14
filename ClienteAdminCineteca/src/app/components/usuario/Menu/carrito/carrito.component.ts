import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  cartItems: any[] = [];
  isSidebarActive: boolean = false;

  // Método para alternar la visibilidad del sidebar
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

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
    alert('Procediendo al pago...');
    // Aquí puedes agregar la lógica para redirigir a la página de pago
  }
}
