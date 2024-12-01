import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../../../interfaces/equipo-interfaz';
import { EquiposFutService } from '../../../services/equipos-fut.service';
import { ToastrModule } from 'ngx-toastr';
import { Jugador } from '../../../interfaces/jugador-interfaz';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-agregar-jugador',
  templateUrl: './agregar-jugador.component.html',
  styleUrl: './agregar-jugador.component.css'
})
export class AgregarJugadorComponent implements OnInit{

  equipos: any[] = [];
  accion='Agregar'

  submitAccion: boolean=false;
  form!: FormGroup;
  id: number | undefined;
constructor(private fb: FormBuilder,
   private equipoFutService: EquiposFutService,
    private router: Router,
    private dialogRef: MatDialogRef<AgregarJugadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{jugador: any| null}) {
  // Inicializar el formulario en el constructor o en ngOnInit
this.creacionFormulario();

}
  ngOnInit(): void {
    this.cargarEquipos();
    
    console.log(this.data)
    console.log('DialogRef:', this.dialogRef);
    if(this.data!=null && this.data.jugador?.id){

      this.id=this.data.jugador.id;
      this.accion='Editar';
     // Esperamos que los equipos estén cargados antes de cargar el jugador
    setTimeout(() => this.cargarJugador(this.data.jugador.id), 0);

    }else{
      this.id=undefined;
    }

  }
  cargarJugador(id:number): void{
    this.equipoFutService.getJugadorById(id).subscribe((jugador) => {
      console.log('Jugador cargado:', jugador);
      this.form.patchValue({
        nombre: jugador.firstName,
        apellido: jugador.lastName,
        edad: jugador.age,
        pais: jugador.country,
        ciudad: jugador.city,
        sueldo: jugador.salary,
        equipo: jugador.teamId // Asigna directamente el ID del equipo
      });
    });
}

asignarDatosJugador(jugador: Jugador): void {
  this.form.patchValue({
    nombre: jugador.firstName,
    apellido: jugador.lastName,
    edad: jugador.age,
    pais: jugador.country,
    ciudad: jugador.city,
    sueldo: jugador.salary,
    equipo: jugador.teamId  // Directly use teamId without Number()

  });
}


creacionFormulario(): void{
  this.form = this.fb.group({
    nombre: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(40)]],
    apellido: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(40)]],
    edad: ['', [Validators.required, Validators.min(16), Validators.max(50)]],
    pais: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
    ciudad: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
    sueldo: ['', [Validators.min(0)]],
    equipo: ['', [Validators.required]] // Select para equipos
  });
}


cargarEquipos() {
  this.equipoFutService.getListEquipos()
  .subscribe(resp=>{
    this.equipos = resp; 
  },error=>{
    console.log(error)
  });
    
  
      // Asigna los equipos a la propiedad `equipos`
   
}



getControlError(controlName: string){
    const control=this.form.get(controlName);
    if(control?.hasError('required')){
      return 'Este campo es obligatorio'
    }
    if (control?.hasError('minlength')) {
      return 'Debe tener al menos 3 caracteres';
    }
    if (control?.hasError('minlength')) {
      return 'Debe tener al menos 3 caracteres';
    }
    if (control?.hasError('maxlength')) {
      return 'Debe tener menos de 50 caracteres';
    }
    return null;
  }

  // Método para agregar o editar equipo
  agregar_editarJugador(){
    if(this.form.valid){
// Crear objeto equipo con los valores del formulario
      const jugador: Jugador={
        id: this.id !== undefined ? this.id : 0,// Incluye el ID solo si existe
        firstName:this.form.value.nombre,
        lastName:this.form.value.apellido,
        age:this.form.value.edad,
        country:this.form.value.pais,
        city:this.form.value.ciudad,
        salary:this.form.value.sueldo,
        teamId: Number(this.form.value.equipo) 

      }
      if (this.id === undefined){
        
        console.log(jugador);
        this.equipoFutService.saveJugador(jugador)
        .subscribe(resp=>{
          console.log("Jugador agregado con éxito", resp);
          this.form.reset();
          this.dialogRef.close();
          // this.router.navigate(['/jugadores/lista']);
        },error=>{
          console.log("Error al agregar el jugador",error)
        })
      }else{
        console.log(this.id,jugador)
        this.equipoFutService.updateJugador(this.id, jugador)
        .subscribe(resp=>{
          console.log('Jugador Actualizado',resp);
          this.dialogRef.close();
          // this.router.navigate(['/jugadores/lista']);

        },error=>{
          console.log('Error al actualizar el jugador',error);
        })

      }
   

    }

  
      
    
  }
   closeDialog(){
    this.dialogRef.close();
  }


  getEquipoNombre(id: number): string {
    const equipo = this.equipos.find(e => e.id === id);
    return equipo ? equipo.name : '';
  }
}
