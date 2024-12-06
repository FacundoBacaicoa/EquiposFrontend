import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Teams } from '../interfaces/equipo-interfaz';
import { Players } from '../interfaces/jugador-interfaz';

@Injectable({
  providedIn: 'root'
})
export class EquiposFutService {

   private myAppUrl: string= 'https://localhost:44369/'
   private myApiUrl: string= 'api/Teams/'
   private myApiUrljug: string='api/Players/'

  constructor(private http: HttpClient) { }

//Equipos
getListEquipos(keyword: string): Observable<any> {
  return this.http.get(`${this.myAppUrl}api/Teams?keyword=${keyword}`);
}

 deleteEquipo(id_e: number): Observable<any>{
  return this.http.delete(this.myAppUrl + this.myApiUrl + id_e);
 }

 saveEquipo(equipo: Teams): Observable<any>{
 return this.http.post(this.myAppUrl + this.myApiUrl, equipo).pipe(
  catchError((error)=>{
    if(error.status=== 404 && error.error.message === 'el equipo ya existe'){
        return throwError('El equipo ya existe, no es posible agregarlo')
    }
    return throwError('Ocurrió un error al intentar guardar el equipo.');
  })
 );
 }

 updateEquipo(id_e:number,equipo:Teams): Observable<any>{
  return this.http.put(this.myAppUrl+ this.myApiUrl + id_e,equipo).pipe(
    catchError((error) => {
      if (error.status === 404 && error.error.message === 'Ya existe otro equipo con el mismo nombre, país y ciudad') {
        return throwError('Ya existe un equipo con los mismos datos, no es posible actualizarlo.');
      }
      return throwError('Ocurrió un error al intentar actualizar el equipo.');
    })
  );
 }

 getEquipoById(id: number): Observable<Teams> {
  return this.http.get<Teams>(`${this.myAppUrl}${this.myApiUrl}${id}`);
}

//Jugadores

getListJugadores(keyword: string):Observable<any>{
  return this.http.get(`${this.myAppUrl}api/Players?keyword=${keyword}`);
}

saveJugador(jugador: Players): Observable<any>{
 return this.http.post(this.myAppUrl + this.myApiUrljug, jugador );
}

updateJugador(id_j:number, jugador: Players): Observable<any>{
  return this.http.put(this.myAppUrl + this.myApiUrljug + id_j,jugador);
}

deleteJugador(id_j: number): Observable<any>{
return this.http.delete(this.myAppUrl + this.myApiUrljug + id_j);
}

getJugadorById(id: number): Observable<Players>{
return this.http.get<Players>(this.myAppUrl+this.myApiUrljug+id)
}
}
