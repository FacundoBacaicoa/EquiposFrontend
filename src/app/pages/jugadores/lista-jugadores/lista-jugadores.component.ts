import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../interfaces/jugador-interfaz';
import { EquiposFutService } from '../../../services/equipos-fut.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { AgregarJugadorComponent } from '../agregar-jugador/agregar-jugador.component';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrl: './lista-jugadores.component.css'
})
export class ListaJugadoresComponent implements OnInit {


jugadores: Jugador[]=[]

currentPage: number=0;
pageSize: number=5;
paginatedJugadores: Jugador[]=[]

jugadoresFiltrados: Jugador[] | null=null;

displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'pais', 'ciudad', 'sueldo','equipo','editar','borrar'];
constructor(private equiposFutService: EquiposFutService,
            private toastr: ToastrService,
            private dialog: MatDialog
){
}
  ngOnInit() {
   this.obtenerJugadores();
  }

obtenerJugadores(){
  this.equiposFutService.getListJugadores()
  .subscribe(resp=>{
    this.jugadores=resp;
    this.updatePaginatedData();
    console.log(this.jugadores);
  })
}

//Pagination
updatePaginatedData(): void {
  const start = this.currentPage * this.pageSize;
  const end = start + this.pageSize;
  this.paginatedJugadores = this.jugadores.slice(start, end);
}

onPageChange(event: PageEvent): void {
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
  this.updatePaginatedData();
}

agregarDialog() {
  const dialogRef = this.dialog.open(AgregarJugadorComponent, {
    width: '600px', 
    height: '700px', 
    data: null 
  });

  dialogRef.afterClosed()
    .subscribe(()=>{
      window.location.reload();
    })
}
editarJugador(jugador: Jugador) {
  const dialogRef = this.dialog.open(AgregarJugadorComponent, {
    width: '600px', 
    height: '700px', 
    data: { jugador }
  });

  dialogRef.afterClosed()
    .subscribe(()=>{
      window.location.reload();
    })
}

eliminarJugador(id: number){
  console.log(id);
this.equiposFutService.deleteJugador(id)
.subscribe(resp=>{
  console.log('Jugador eliminado con éxito',resp)
  this.toastr.error('Jugador elminado con éxito','jugador Eliminado')
  this.obtenerJugadores();
},error=>{
  console.log(error)
})
}



}
