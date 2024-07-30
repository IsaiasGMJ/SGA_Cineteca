import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export class CrearProductoComponent {
  productoForm: FormGroup;

  file: any

  constructor(private fb: FormBuilder, private router: Router) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: [''],
      imagen: [''],
    })
  }
  ngOnInit(): void { }

  listaProducto(): void {
    console.log('Redirigiendo a lista de productos...');
    this.router.navigate(['/producto/lista']);
  }

  agregarProducto() {
    console.log(this.productoForm)
    console.log(this.productoForm.get('producto')?.value)

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      precio: this.productoForm.get('precio')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      imagen: this.productoForm.get('imagen')?.value
    }
    console.log(PRODUCTO);
    this.router.navigate(['/'])
  }

  fotoseleccionada(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
    }
  }
}

