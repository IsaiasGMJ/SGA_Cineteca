import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [RouterModule,CommonModule,
    RouterLink,AdminSidebarComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

}
