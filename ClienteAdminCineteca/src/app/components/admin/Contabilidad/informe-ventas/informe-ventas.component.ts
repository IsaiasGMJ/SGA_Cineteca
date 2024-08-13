import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-informe-ventas',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,AdminSidebarComponent],
  templateUrl: './informe-ventas.component.html',
  styleUrl: './informe-ventas.component.css'
})
export class InformeVentasComponent {

}
