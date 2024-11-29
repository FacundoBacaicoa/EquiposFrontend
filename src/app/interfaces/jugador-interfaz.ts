import { Equipo } from "./equipo-interfaz";

export interface Jugador {
    id?: number;           
    firstName: string;        
    lastName: string;        
    age: number;            
    country: string;          
    city: string;        
    salary: number;          
    teamId: number;        // Changed from Equipo_Id to EquipoId
       
}