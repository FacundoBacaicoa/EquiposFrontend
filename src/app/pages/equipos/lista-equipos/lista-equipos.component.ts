import { Component } from '@angular/core';
import {  Teams } from '../../../interfaces/equipo-interfaz';
import { EquiposFutService } from '../../../services/equipos-fut.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEquipoComponent } from '../agregar-equipo/agregar-equipo.component';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../../componentes/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.component.html',
  styleUrl: './lista-equipos.component.css'
})
export class ListaEquiposComponent {



  equipos: Teams[]=[];

  currentPage: number = 0; // Current page
  pageSize: number = 5; // Items per page
  paginatedTeams: Teams[] = []; // Datos paginados para mostrar

  keyword: string="";

  filterTeams: Teams[] | null = null;
  
  selectedButton:string ='';
   
  constructor(private equiposFutService: EquiposFutService,
              private router: Router,
              private toastr: ToastrService,
              private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getTeams();
   }
  
    getTeams(){
      this.equiposFutService.getListEquipos(this.keyword).subscribe(
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
      this.paginatedTeams = this.equipos.slice(start, end);
    }
    onPageChange(event: PageEvent): void {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginatedData();
    }

    search(keyword: string){
      this.keyword=keyword
      this.getTeams();
    }
    
    deleteTeams(id: number, nombre: string){
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      width:'350px',
      data:{
        title:'Equipo',
        name:nombre
      }
    });

      dialogRef.afterClosed().subscribe(result=>{
        if (result) {
          this.equiposFutService.deleteEquipo(id)
          .subscribe(resp=>{
            this.toastr.error('Equipo eliminado con éxito', 'Equipo eliminado!');
            this.getTeams();
          },error=>{
            console.log(error);
          })
        }
      })
    
    }

   openDialog(){
    let dialogRef= this.dialog.open(AgregarEquipoComponent,{width:'600px',height:'650px',data:null});
    dialogRef.afterClosed()
    .subscribe(()=>{
      window.location.reload();
    })
  }


  editTeams(equipo: Teams){
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
