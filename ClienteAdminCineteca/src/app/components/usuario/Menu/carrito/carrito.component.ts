import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CarritoService } from '../../../../services/carrito.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  private apiUrl = 'http://localhost:4000/api/carrito/vender';

  constructor(
    private carritoService: CarritoService,
    private http: HttpClient
  ) {}

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

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No se encontró el token de autenticación.');
      return;
    }

    try {
      // Decodificar el token para obtener la ID del usuario
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id; // Asegúrate de que esto coincide con la estructura de tu token

      const payload = {
        items: this.cartItems.map(item => ({
          productId: item._id,
          quantity: item.cantidad,
          price: item.precio
        }))
      };

      const headers = new HttpHeaders().set('x-auth-token', token);
      const urlWithUserId = `${this.apiUrl}/${userId}`;

      console.log('Contenido del carrito:', this.cartItems);
      console.log('Datos enviados:', payload);

      this.http.post(urlWithUserId, payload, { headers }).subscribe({
        next: (response: any) => {
          console.log('Venta realizada con éxito', response);
          alert('Compra realizada con éxito');
          this.cartItems = []; // Vaciar el carrito después de la compra
          this.toggleSidebar();
        },
        error: (error: { error: { message: string; }; }) => {
          console.error('Error al realizar la compra', error);
          alert('Error al realizar la compra: ' + error.error.message);
        }
      });
    } catch (err) {
      console.error('Error al decodificar el token JWT', err);
      alert('Error al procesar la autenticación.');
    }
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
