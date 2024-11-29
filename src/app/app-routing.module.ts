import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipos/lista', // Redirige directamente a equipos/lista
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), // Carga PagesModule
  },
  {
    path: '**',
    redirectTo: 'equipos/lista', // Cualquier ruta no encontrada redirige a equipos/lista
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}