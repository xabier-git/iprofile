import { Routes } from '@angular/router';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { EdicionComponent } from './pages/edicion/edicion.component';
import { ListadoComponent } from './pages/listado/listado.component';

export const routes: Routes = [
  { path: '', component: IngresoComponent },
  { path: 'edicion', component: EdicionComponent },
  { path: 'listado', component: ListadoComponent },
];
