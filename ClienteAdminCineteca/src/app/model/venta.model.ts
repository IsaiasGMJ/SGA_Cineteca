// models/venta.model.ts
export interface VentaItem {
    product: Producto;
    quantity: number;
}

export interface Venta {
    _id?: string;
    user: string;  // ID del usuario
    items: VentaItem[];
    total: number;
    date?: Date;
}

// Modelo para el producto dentro de la venta (puede ser igual al de Carrito)
export interface Producto {
    _id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    // Añade más campos si es necesario
}
