import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  cartItems: any[] = [];
  isSidebarActive: boolean = false;
  private apiUrl = 'http://localhost:4000/api/carrito'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Método para agregar un artículo al carrito
  addItem(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      existingItem.cantidad++;
    } else {
      this.cartItems.push({ ...item, cantidad: 1 });
    }
  }

  // Método para eliminar un artículo del carrito
  removeItem(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem._id === item._id);
    if (existingItem && existingItem.cantidad > 1) {
      existingItem.cantidad--;
    } else {
      this.cartItems = this.cartItems.filter(cartItem => cartItem._id !== item._id);
    }
  }

  // Calcular el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  // Método para proceder al pago
  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      alert('No hay productos en el carrito.');
      return;
    }
  
    const userId = '66bbcea52f596d56a7786cb1'; // Aquí deberías obtener el userId dinámicamente según tu lógica de autenticación
  
    const payload = {
      userId: userId,
      items: this.cartItems.map(item => ({
        productId: item._id,
        quantity: item.cantidad,  // Se envía la cantidad real de cada producto
        price: item.precio
      }))
    };
    
    console.log('Contenido del carrito:', this.cartItems); // Verifica que el carrito tenga productos
    console.log('Datos enviados:', payload);
  
    this.http.post(this.apiUrl + '/vender', payload).subscribe({
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

  // Método para enviar el pedido
  enviarPedido() {
    if (this.cartItems.length > 0) {
      this.proceedToCheckout();
    } else {
      alert("No hay artículos en el carrito para proceder al pago.");
    }
  }

  // Toggle para el sidebar
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
