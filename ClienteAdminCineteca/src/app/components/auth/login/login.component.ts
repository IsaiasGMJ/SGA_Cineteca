import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrige `styleUrl` a `styleUrls`
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService // Inyecta ToastrService
  ) {
    // Inicializar el formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Inicialización adicional si es necesario
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login exitoso', response);
          this.toastr.success('Inicio de sesión exitoso', 'Éxito'); // Mostrar notificación de éxito
          this.router.navigate(['/admin']); // Redirige a la ruta deseada
        },
        error => {
          console.error('Error de login', error);
          this.toastr.error('Error al iniciar sesión. Verifica tus credenciales', 'Error'); // Mostrar notificación de error
        }
      );
    } else {
      this.toastr.warning('Por favor, completa todos los campos correctamente', 'Advertencia'); // Mostrar advertencia si el formulario no es válido
    }
  }
}
