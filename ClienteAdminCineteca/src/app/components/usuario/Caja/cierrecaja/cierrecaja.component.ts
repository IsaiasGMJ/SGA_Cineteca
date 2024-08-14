import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-cierrecaja',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,NavbarComponent],
  templateUrl: './cierrecaja.component.html',
  styleUrl: './cierrecaja.component.css'
})
export class CierrecajaComponent {

}
