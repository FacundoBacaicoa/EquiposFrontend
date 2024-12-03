import { Component } from '@angular/core';
import {  Equipo } from '../../../interfaces/equipo-interfaz';
import { EquiposFutService } from '../../../services/equipos-fut.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEquipoComponent } from '../agregar-equipo/agregar-equipo.component';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.component.html',
  styleUrl: './lista-equipos.component.css'
})
export class ListaEquiposComponent {



  equipos: Equipo[]=[];

  currentPage: number = 0; // Current page
  pageSize: number = 5; // Items per page
  paginatedEquipos: Equipo[] = []; // Datos paginados para mostrar

  equiposFiltrados: Equipo[] | null = null;
  
  selectedButton:string ='';
   
  constructor(private equiposFutService: EquiposFutService,
              private router: Router,
              private toastr: ToastrService,
              private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.obtenerEquipos();
   }
  
    obtenerEquipos(){
      this.equiposFutService.getListEquipos().subscribe(
      resp => {
        console.log('Datos recibidos:', resp);
        this.equipos = resp;
        this.updatePaginatedData();
      },
      error => {
        console.log(error);
      }
    );
    }

    //Paginator
    updatePaginatedData(): void {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedEquipos = this.equipos.slice(start, end);
    }
    onPageChange(event: PageEvent): void {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginatedData();
    }


    
    eliminarEquipo(id: number){
      console.log('ID a eliminar:', id);
      this.equiposFutService.deleteEquipo(id)
      .subscribe(resp=>{
        this.toastr.error('Equipo eliminado con éxito', 'Equipo eliminado!');
        this.obtenerEquipos();
      },error=>{
        console.log(error);
      })
    }

   openDialog(){
    let dialogRef= this.dialog.open(AgregarEquipoComponent,{width:'600px',height:'650px',data:null});
    dialogRef.afterClosed()
    .subscribe(()=>{
      window.location.reload();
    })
  }


  editarEquipo(equipo: Equipo){
    // Navegar a agregar-component con el ID como parámetro
    console.log(equipo)

    let dialogRef=
    this.dialog.open(AgregarEquipoComponent,{
      width:'600px',
      height:'650px',
      data:{equipo}
    });
    dialogRef.afterClosed()
    .subscribe(()=>{
      window.location.reload();
    })
  }

  displayedColumns: string[] = ['nombre', 'pais', 'ciudad', 'estadio', 'categoria', 'dt','editar', 'borrar'];

}
