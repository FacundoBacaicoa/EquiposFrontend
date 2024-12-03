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

@Output() newData=new EventEmitter<string>(); // Emitir resultados filtrados


buscarText: string='';// Texto ingresado por el usuario


buscar(){
this.newData.emit(this.buscarText.trim());
}

}
