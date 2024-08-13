import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-crudproductos',
  standalone: true,
  imports: [RouterModule,CommonModule,
    RouterLink,AdminSidebarComponent],
  templateUrl: './crudproductos.component.html',
  styleUrl: './crudproductos.component.css'
})
export class CRUDproductosComponent {

}
