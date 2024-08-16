import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
import { Venta } from '../../../../model/venta.model';
import { ContabilidadService } from '../../../../services/contabilidad.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, AdminSidebarComponent, NgApexchartsModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: Venta[] = [];

  // Variables para la gráfica usando ApexCharts
  public chartOptions: any;

  constructor(
    private contabilidadService: ContabilidadService,
    private usuarioService: UsuarioService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'pie',
        height: 350
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.contabilidadService.obtenerVentas().subscribe((data: Venta[]) => {
      this.ventas = data;
      this.actualizarGrafica();
    });
  }

  actualizarGrafica(): void {
    const productoTotales: { [key: string]: number } = {};

    this.ventas.forEach(venta => {
      venta.items.forEach(item => {
        const nombreProducto = item.product.nombre;
        if (productoTotales[nombreProducto]) {
          productoTotales[nombreProducto] += item.quantity;
        } else {
          productoTotales[nombreProducto] = item.quantity;
        }
      });
    });

    // Actualizamos los datos de la gráfica
    this.chartOptions.labels = Object.keys(productoTotales);
    this.chartOptions.series = Object.values(productoTotales);
  }
}
