import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edicion',
  standalone: true,
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EdicionComponent {
  profile: any = null;

  constructor(private apiService: ApiService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.profile = nav?.extras.state?.['profile'];
  }

  guardar() {
    console.log('Guardar()');
    if (!this.profile) {
      alert('No hay perfil para actualizar');
      return;
    }
    console.log('Guardando perfil:', this.profile);
    this.apiService.updateProfile(this.profile).subscribe({
      next: () => {
        alert('Perfil actualizado');
        this.router.navigate(['/listado']).then(() => {});
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        alert('Error al actualizar');
      }
    });
  }

}
