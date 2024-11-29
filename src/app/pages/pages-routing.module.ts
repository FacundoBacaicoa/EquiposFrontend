import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaEquiposComponent } from './equipos/lista-equipos/lista-equipos.component';
import { AgregarEquipoComponent } from './equipos/agregar-equipo/agregar-equipo.component';
import { ListaJugadoresComponent } from './jugadores/lista-jugadores/lista-jugadores.component';
import { AgregarJugadorComponent } from './jugadores/agregar-jugador/agregar-jugador.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Sidenav y toolbar
    children: [
      {
        path: 'equipos',
        children: [
          { path: 'lista', component: ListaEquiposComponent },
          { path: 'agregar', component: AgregarEquipoComponent },
          { path: 'editar/:id', component: AgregarEquipoComponent },
        ],
      },
      {
        path: 'jugadores',
        children: [
          { path: 'lista', component: ListaJugadoresComponent },
          { path: 'agregar', component: AgregarJugadorComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
