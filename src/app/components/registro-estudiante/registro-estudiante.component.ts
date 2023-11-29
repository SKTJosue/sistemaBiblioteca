import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiante } from 'src/app/usuario/estudiante/estudiante';
import { EstudianteService } from 'src/app/usuario/estudiante/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {
  isCreacion: boolean;
  estudianteId:any;
  @Output() actualizacionRealizada = new EventEmitter<void>();
  constructor(private apiEstudiate: EstudianteService,
    private dialogRef: MatDialogRef<RegistroEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,)
    {
      this.isCreacion = this.data.isCreacion;
      this.estudianteId = this.data.element;
    }
    closeWithoutSave(){   
      
      Swal.fire({
        title: 'Seguro quiere cancelar?',
        text: "no se guardara",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si quiero cancerlar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'se cancelo el registro!',
            '.',
            'success'
          );
          this.dialogRef.close();
        }
      })
      
    }
formEstudiante=new FormGroup({
  nombre: new FormControl('',[
    Validators.required,
  ]),
  apellido: new FormControl('',[
    Validators.required,
  ]),
  numeroCelular: new FormControl('',[
    Validators.required,
  ]),
  nombreTutor: new FormControl('',[
    Validators.required,
  ]),
  apellidoTutor: new FormControl('',[
    Validators.required,
  ]),
  numeroCelularTutor: new FormControl('',[
    Validators.required,
  ])
})
ngOnInit(){
  if (!this.isCreacion) {
    // Modo de edición
    // Realizar una solicitud al servicio para obtener los datos de la editorial según this.editorialId
    this.apiEstudiate.buscarEstudianteId(this.estudianteId).subscribe((response:Estudiante) => {
      if(response){
        this.formEstudiante.patchValue({
          nombre: response.nombre,
          apellido: response.apellido,
          numeroCelular: response.numeroCelular?.toLocaleString(),
          nombreTutor: response.nombreTutor,
          apellidoTutor: response.apellidoTutor,
          numeroCelularTutor: response.numeroCelularTutor?.toLocaleString(),
        });
        console.log(this.formEstudiante.value)
      }
    },error=>(console.log(error)))
  }
}
succes(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Se agrego existosamente',
    showConfirmButton: false,
    timer: 1500
  })
}

onSubmit(form:any){
}
addEstudiante(){
  if (this.isCreacion) {
    // Lógica para creación
    console.log(this.estudianteId)
    this.apiEstudiate.addEstudiante(this.formEstudiante.value).subscribe((response) => {
      if (response) {
        console.log('Se registró correctamente');
        // EditorialComponent.cargarEditorial()
        this.succes();
        this.actualizacionRealizada.emit();
      }
    });
  } else {
    // console.log(this.editorialId)
    // Lógica para edición
    // Obtener el ID del elemento a editar desde this.data.id y realizar la edición correspondiente
    // this.apiEditorial.buscarEditorialId(this.data.id).subscribe
    this.apiEstudiate.editarEstudiante(this.estudianteId,this.formEstudiante.value).subscribe((response)=>{
      if(response){
        console.log('se actulizo el dato')
        this.succes()
      }
    },error=>(console.log(error)))
    
  }
  // this.editorialC.cargarEditorial()
  this.actualizacionRealizada.emit();
  this.dialogRef.close();
}
}
