import { Component, OnInit } from '@angular/core';
import {  Players } from '../../../interfaces/jugador-interfaz';
import { EquiposFutService } from '../../../services/equipos-fut.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { AgregarJugadorComponent } from '../agregar-jugador/agregar-jugador.component';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../../componentes/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrl: './lista-jugadores.component.css'
})
export class ListaJugadoresComponent implements OnInit {


jugadores: Players[]=[]

currentPage: number=0;
pageSize: number=5;
paginatedPlayers: Players[]=[]

keyword: string=""

filterPlayers: Players[] | null=null;

displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'pais', 'ciudad', 'sueldo','equipo','editar','borrar'];
constructor(private equiposFutService: EquiposFutService,
            private toastr: ToastrService,
            private dialog: MatDialog
){
}
  ngOnInit() {
   this.getPlayer();
  }

getPlayer(){
  this.equiposFutService.getListJugadores(this.keyword)
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
  this.paginatedPlayers = this.jugadores.slice(start, end);
}

onPageChange(event: PageEvent): void {
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
  this.updatePaginatedData();
}

search(keyword: string){
  this.keyword=keyword
  this.getPlayer();
}


addPlayer() {
  const dialogRef = this.dialog.open(AgregarJugadorComponent, {
    width: '600px', 
    height: '740px', 
    data: null 
  });

  dialogRef.afterClosed()
    .subscribe(()=>{
      window.location.reload();
    })
}
editPlayer(jugador: Players) {
  const dialogRef = this.dialog.open(AgregarJugadorComponent, {
    width: '600px', 
    height: '740px', 
    data: { jugador }
  });

  dialogRef.afterClosed()
    .subscribe(()=>{
      window.location.reload();
    })
}

deletePlayer(id: number, nombre: string, apellido: string){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data:{
      title: 'Jugador',
      name: nombre,
      lastname: apellido
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.equiposFutService.deleteJugador(id).subscribe(
        () => {
          this.toastr.error('Jugador eliminado con éxito', 'Jugador Eliminado');
          this.getPlayer();
        },
        error => {
          console.error('Error al eliminar el jugador:', error);
        }
      );
    }
  });
}



}
