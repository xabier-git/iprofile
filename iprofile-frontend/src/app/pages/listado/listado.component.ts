import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Para ngModel

interface Profile {
  nombre: string;
  nickname: string;
  tieneNovio: boolean;
  equipoActual: string;
}

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListadoComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getProfilesList().subscribe({
      next: (data: any[]) => {
        console.log('Data fetched from API:', data);
        this.profiles = data.map(item => ({
          nombre: item.nombre,
          nickname: item.nickname,
          tieneNovio: item.tieneNovio,
          equipoActual: item.equipoActual
        }));
      },
      error: (err) => {
        console.error('Error fetching profiles:', err);
      }
    });
  }

  editar(profile: Profile) {
    // Navega a la ruta de edición pasando el nickname (o id si tienes)
    console.log('Editing profile:', profile);
    this.router.navigate(['/edicion'], { state: { profile } });
  }

  eliminar(profile: Profile) {
    // Aquí puedes implementar la lógica para eliminar el perfil
    console.log('Deleting profile:', profile);
    if (!profile || !profile.nickname) {
      alert('El perfil o el nickname es obligatorio para eliminar');
      return;
    }
    this.apiService.deleteProfile(profile.nickname).subscribe({
      next: () => {
        alert('Perfil eliminado con éxito');
        this.profiles = this.profiles.filter(p => p.nickname !== profile.nickname);
      },
      error: (err) => {
        console.error('Error deleting profile:', err);
        alert('Error al eliminar el perfil');
      }
    });
  } 
}
