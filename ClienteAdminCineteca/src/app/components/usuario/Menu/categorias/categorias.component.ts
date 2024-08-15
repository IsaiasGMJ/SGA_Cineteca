import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CategoriaService } from '../../../../services/categoria.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, NavbarComponent],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'] // Asegúrate de que el nombre es 'styleUrls' no 'styleUrl'
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
producto: any;

  constructor(private categoriaService: CategoriaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
      },
      (error: any) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  onCardClick(producto: any): void {
    console.log('Card clicked:', producto);
    // Aquí puedes agregar la lógica para manejar el click, por ejemplo, redireccionar a otra página, abrir un modal, etc.
  }
}
