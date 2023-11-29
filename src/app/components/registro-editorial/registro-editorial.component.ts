import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorialesService } from 'src/app/usuario/editorial/editoriales.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Editorial } from 'src/app/usuario/editorial/editorial';
// import { EditorialComponent } from '../editorial/editorial.component';

@Component({
  selector: 'app-registro-editorial',
  templateUrl: './registro-editorial.component.html',
  styleUrls: ['./registro-editorial.component.css']
})
export class RegistroEditorialComponent { 
  isCreacion: boolean;
  editorialId: any;
  @Output() actualizacionRealizada = new EventEmitter<void>();
  constructor(private apiEditorial:EditorialesService, 
    private dialogRef:MatDialogRef<RegistroEditorialComponent>,  
    @Inject(MAT_DIALOG_DATA) private data: any,
    ){
      this.isCreacion = this.data.isCreacion;
      this.editorialId = this.data.element;
    }
  formEditorial= new FormGroup({
    nombreEditorial : new FormControl('',[
      Validators.required
    ]),
  })
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
  
  succes(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se modifico exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
  }
  ngOnInit() {
    if (!this.isCreacion) {
      // Modo de edición
      // Realizar una solicitud al servicio para obtener los datos de la editorial según this.editorialId
      this.apiEditorial.buscarEditorialId(this.editorialId).subscribe((response:Editorial) => {
        if(response){
          this.formEditorial.patchValue({
            nombreEditorial: response.nombreEditorial
          });
        }
      })
    }
  }
  addEditorial() {
    if (this.isCreacion) {
      // Lógica para creación
      console.log(this.editorialId)
      this.apiEditorial.addEditorial(this.formEditorial.value).subscribe((response) => {
        if (response) {
          console.log('Se registró correctamente');
          // EditorialComponent.cargarEditorial()
          this.actualizacionRealizada.emit();
        }
      });
    } else {
      console.log(this.editorialId)
      // Lógica para edición
      // Obtener el ID del elemento a editar desde this.data.id y realizar la edición correspondiente
      // this.apiEditorial.buscarEditorialId(this.data.id).subscribe
      this.apiEditorial.editarEditorial(this.editorialId,this.formEditorial.value).subscribe((response)=>{
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
