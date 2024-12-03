import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../../../interfaces/equipo-interfaz';
import { EquiposFutService } from '../../../services/equipos-fut.service';
import {  ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrl: './agregar-equipo.component.css'
})
export class AgregarEquipoComponent implements OnInit{
  

  form!: FormGroup; // Declaración del formulario reactivo
  accion='Agregar'
  id: number | undefined;

  submitAccion: boolean=false;
    // Lista de categorías
    categorias = [
      { id: 'Primera División', desc: 'Primera División' },
      { id: 'Segunda División', desc: 'Segunda División' },
      { id: 'Regional', desc: 'Regional' }
     
    ];



  constructor(private fb: FormBuilder,
    private router: Router,
    private equiposFutService: EquiposFutService,
    private route: ActivatedRoute ,// Para acceder a los parámetros de la URL
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AgregarEquipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { equipo: any | null }

    
  ) {
   this.creacionFormulario();
  }
  ngOnInit(): void {
    // Obtener ID de la URL y cargar datos del equipo si existe
    // this.route.params.subscribe(params => {
    //   this.id = +params['id']; // Convertir el parámetro 'id' a número
    console.log(this.data)
    
      if (this.data!=null && this.data.equipo?.id) {
        
        this.id=this.data.equipo.id;
        this.accion = 'Editar';
        this.cargarEquipo(this.data.equipo.id); // Cargar el equipo para edición
     }else{
      this.id=undefined;
     }
    // });

  }


  cargarEquipo(id:number): void{
    this.equiposFutService.getEquipoById(id).subscribe(
      equipo => {
        this.form.patchValue({
          nombre: equipo.name,
          pais: equipo.country,
          ciudad: equipo.city,
          estadio: equipo.stadium,
          categoria: equipo.category,
          dt: equipo.coach,
        });
      },
      error => {
        console.log('Error al cargar el equipo', error);
      }
    );
  }
  
  creacionFormulario(): void {
    this.form = this.fb.group({
      id_e: [0],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pais: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      ciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      estadio: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      categoria: ['', [Validators.required]],
      dt: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
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
  agregar_editarEquipo() {
    this.submitAccion = true;
   if(this.form.valid){
    // Crear objeto equipo con los valores del formulario
    const equipo: Equipo={
      id: this.id, // Incluye el ID solo si existe
      name:this.form.value.nombre,
      country:this.form.value.pais,
      city:this.form.value.ciudad,
      stadium:this.form.value.estadio,
      category:this.form.value.categoria,
      coach:this.form.value.dt

    }
    if(!this.id){
      equipo.id=0
      this.equiposFutService.saveEquipo(equipo)
      .subscribe(resp=>{
        console.log("Equipo agregado exitosamente",resp);
        this.form.reset();
        
        this.dialogRef.close();
      },error=>{
        this.toastr.error(error);
        console.log('Error al agregar el equipo', error)
      })
    }else{
      console.log(this.id,equipo)
      this.equiposFutService.updateEquipo(this.id,equipo)
      .subscribe(resp=>{
        console.log('Equipo Actualizado', resp)
        this.dialogRef.close();
      },error=>{
          this.toastr.error(error);
          console.log('Error al actualizar equipo',error);
      });
      
    }

 
   }

   
  }

  closeDialog(){
    this.dialogRef.close();
  }
  

 }
