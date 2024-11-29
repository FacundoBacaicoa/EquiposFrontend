import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../interfaces/jugador-interfaz';
import { EquiposFutService } from '../../../services/equipos-fut.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { AgregarJugadorComponent } from '../agregar-jugador/agregar-jugador.component';
@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrl: './lista-jugadores.component.css'
})
export class ListaJugadoresComponent implements OnInit {


jugadores: Jugador[]=[]

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
    this.jugadores=resp
    console.log(this.jugadores);
  })
}
agregarDialog() {
  const dialogRef = this.dialog.open(AgregarJugadorComponent, {
    width: '600px', 
    height: '700px', 
    data: null 
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Only reload if a player was actually added
      this.obtenerJugadores();
    }
  });
}
editarJugador(jugador: Jugador) {
  const dialogRef = this.dialog.open(AgregarJugadorComponent, {
    width: '600px', 
    height: '700px', 
    data: { jugador }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Reload players if an update occurred
      this.obtenerJugadores();
    }
  });
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
