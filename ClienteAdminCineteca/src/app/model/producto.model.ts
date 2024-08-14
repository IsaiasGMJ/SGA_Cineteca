// src/app/models/producto.model.ts
export interface Producto {
    _id?: string; // MongoDB genera un ID automáticamente, así que es opcional
    nombre: string;
    categoria: string; // Puedes cambiar a tipo específico si tienes una interfaz para Categoria
    precio: number;
    descripcion?: string;
    imagen?: string;
    cantidad: number;
    estado?: 'activo' | 'inactivo' | 'agotado';
    fechaCreacion?: Date; // Esto puede ser opcional si no siempre tienes la fecha de creación
}
