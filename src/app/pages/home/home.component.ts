import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  titleT: string='Gestión de equipos';

  isSidenavOpened = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  
  ngOnInit(): void {
    this.setTitleBasedOnRoute();
    // Detectar cambios en la ruta incluso si no se recarga la página
    this.router.events.subscribe(() => {
      this.setTitleBasedOnRoute();
    });
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

  private setTitleBasedOnRoute(): void {
    const currentRoute = this.router.url; 
    if (currentRoute.includes('/jugadores')) {
      this.titleTolbar('jugadores');
    } else if (currentRoute.includes('/equipos')) {
      this.titleTolbar('equipos');
    }
  } 

}
