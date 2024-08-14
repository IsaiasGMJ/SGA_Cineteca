import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterModule,CommonModule,
    RouterLink,AdminSidebarComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})

export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario: any = {
    username: '',
    email: '',
    password: '',
    role: 'user'
  };

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // Cargar todos los usuarios
  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      data => this.usuarios = data,
      error => console.error('Error al cargar los usuarios', error)
    );
  }

  // Crear un nuevo usuario
  crearUsuario(): void {
    this.usuarioService.createUsuario(this.nuevoUsuario).subscribe(
      data => {
        this.usuarios.push(data);
        this.nuevoUsuario = { username: '', email: '', password: '', role: 'user' };
      },
      error => console.error('Error al crear el usuario', error)
    );
  }

  // Editar un usuario existente
  editarUsuario(usuario: any): void {
    this.usuarioService.updateUsuario(usuario._id, usuario).subscribe(
      data => this.cargarUsuarios(),
      error => console.error('Error al editar el usuario', error)
    );
  }

  // Eliminar un usuario
  eliminarUsuario(id: string): void {
    this.usuarioService.deleteUsuario(id).subscribe(
      data => this.usuarios = this.usuarios.filter(u => u._id !== id),
      error => console.error('Error al eliminar el usuario', error)
    );
  }
}