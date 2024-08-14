import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
// @ts-ignore
import {Input, Ripple, initMDB } from "mdb-ui-kit";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet ,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router){}
ngAfterViewInit(){
  initMDB({ Input, Ripple });
}
Fakelogin(){
  this.router.navigate(['/admin']);
}
}
