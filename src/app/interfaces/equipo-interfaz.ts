export interface Teams{
    id?: number;         // Identificador único del equipo
    name: string;     
    country: string;   
    city: string; 
    stadium: string;
    category: Category; 
    coach: string;
  }


  export enum Category{
    Primera_Division= "Primera Division",
    Segunda_Division= "Segunda Division",
    Regional="Regional",
    
  }