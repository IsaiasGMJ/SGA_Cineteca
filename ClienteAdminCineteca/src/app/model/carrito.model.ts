// models/carrito.model.ts
export interface CarritoItem {
    product: Producto;
    quantity: number;
}

export interface Carrito {
    _id?: string;
    user: string;  // ID del usuario
    items: CarritoItem[];
}

// Modelo para el producto dentro del carrito
export interface Producto {
    _id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    // Añade más campos si es necesario (por ejemplo, descripción, imagen, etc.)
}
