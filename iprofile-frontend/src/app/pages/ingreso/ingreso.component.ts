import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  imports: [CommonModule, FormsModule],
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {
 
  profile: any = {};

  constructor (private apiService: ApiService, private router: Router )   {
    console.log("IngresoComponent initialized");
  }

  ingresar() {
    console.log("Ingresando...");
    // Aquí podrías agregar lógica para manejar el ingreso, como redirigir a otra página o mostrar un mensaje.
    // Por ejemplo, podrías usar un servicio de autenticación o redirigir a una página de inicio.
    console.log('Perfil ingresado:', this.profile);
    if (!this.profile) {
      alert('No hay perfil para ingresar');
      return;
    }

    if (!this.profile.nickname) {
      alert('El nickname es obligatorio');
      return;
    }

    
    console.log('creando perfil:', this.profile);
    this.apiService.createProfile(this.profile).subscribe({
      next: () => {
        alert('Perfil creado');
        this.router.navigate(['/listado']).then(() => {});
      },
      error: (err) => {
        console.error('Error al crear el perfil', err);
        alert('Error al Ingresar');
      }
    });
  
 }
}
