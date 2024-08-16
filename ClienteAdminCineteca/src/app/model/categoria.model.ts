export interface Categoria {
    id: string;
    nombre: string;
    descripcion?: string;
    imagen?: File | string; // Allow File or URL
    imagenUrl?: string; // For preview URL
    fechaCreacion: Date;
}
