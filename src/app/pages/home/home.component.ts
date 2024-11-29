import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  titleT: string='Gestión de equipos';

  isSidenavOpened = false;
  constructor(){

  }
  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened; // Alternar estado
  }

  titleTolbar(title: string){

    if (title=='equipos') {
      this.titleT="Gestión de equipos"
    }else if(title=='jugadores'){
      this.titleT="Gestión de jugadores"
    }
   
  }
 
}
