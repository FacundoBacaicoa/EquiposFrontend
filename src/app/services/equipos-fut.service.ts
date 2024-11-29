import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo-interfaz';
import { Jugador } from '../interfaces/jugador-interfaz';

@Injectable({
  providedIn: 'root'
})
export class EquiposFutService {

   private myAppUrl: string= 'https://localhost:44349/'
   private myApiUrl: string= 'api/Teams/'
   private myApiUrljug: string='api/Players/'

  constructor(private http: HttpClient) { }

//Equipos
  getListEquipos(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

 deleteEquipo(id_e: number): Observable<any>{
  return this.http.delete(this.myAppUrl + this.myApiUrl + id_e);
 }

 saveEquipo(equipo: Equipo): Observable<any>{
 return this.http.post(this.myAppUrl + this.myApiUrl, equipo);
 }

 updateEquipo(id_e:number,equipo:Equipo): Observable<any>{
  return this.http.put(this.myAppUrl+ this.myApiUrl + id_e,equipo);
 }

 getEquipoById(id: number): Observable<Equipo> {
  return this.http.get<Equipo>(`${this.myAppUrl}${this.myApiUrl}${id}`);
}

//Jugadores

getListJugadores():Observable<any>{
return this.http.get(this.myAppUrl+ this.myApiUrljug);
}

saveJugador(jugador: Jugador): Observable<any>{
 return this.http.post(this.myAppUrl + this.myApiUrljug, jugador );
}

updateJugador(id_j:number, jugador: Jugador): Observable<any>{
  return this.http.put(this.myAppUrl + this.myApiUrljug + id_j,jugador);
}

deleteJugador(id_j: number): Observable<any>{
return this.http.delete(this.myAppUrl + this.myApiUrljug + id_j);
}

getJugadorById(id: number): Observable<Jugador>{
return this.http.get<Jugador>(this.myAppUrl+this.myApiUrljug+id)
}
}
