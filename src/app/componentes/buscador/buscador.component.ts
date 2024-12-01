import { Component, EventEmitter, input, Input, Output } from '@angular/core';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
@Input() title: string='Buscar';// Título del input
@Input() titlePlaceholder: string='';
@Input() data: any[]=[]; // Lista de datos a buscar
@Input() propiedades: string[]= []; // Propiedad del objeto para filtrar

@Output() filtrarData=new EventEmitter<any[]>(); // Emitir resultados filtrados


buscarText: string='';// Texto ingresado por el usuario


  busqueda() {
    const filtrado = this.data.filter(item => 
      this.propiedades.some(propiedad => 
        item[propiedad]?.toLowerCase().includes(this.buscarText.toLowerCase())
      )
    );
    this.filtrarData.emit(filtrado);
  }

}