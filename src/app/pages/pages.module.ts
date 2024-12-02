import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AgregarJugadorComponent } from './jugadores/agregar-jugador/agregar-jugador.component';
import { ListaJugadoresComponent } from './jugadores/lista-jugadores/lista-jugadores.component';
import { AgregarEquipoComponent } from './equipos/agregar-equipo/agregar-equipo.component';
import { ListaEquiposComponent } from './equipos/lista-equipos/lista-equipos.component';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { PagesRoutingModule } from './pages-routing.module';

import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuscadorComponent } from '../componentes/buscador/buscador.component';
import { PaginationComponent } from '../componentes/pagination/pagination.component';




@NgModule({
  declarations: [ HomeComponent,
    ListaEquiposComponent,
    AgregarEquipoComponent,
    ListaJugadoresComponent,
    AgregarJugadorComponent,
    BuscadorComponent,
    PaginationComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,



    //Angular Material
    
    MaterialModule
  ],
  exports:[[ HomeComponent,
    ListaEquiposComponent,
    AgregarEquipoComponent,
    ListaJugadoresComponent,
    AgregarJugadorComponent,
    BuscadorComponent, 
    PaginationComponent]]
})
export class PagesModule { }
