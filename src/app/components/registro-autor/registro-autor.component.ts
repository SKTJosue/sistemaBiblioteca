import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Autor } from 'src/app/usuario/autor/autor';
import { AutoresService } from 'src/app/usuario/autor/autores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-autor',
  templateUrl: './registro-autor.component.html',
  styleUrls: ['./registro-autor.component.css']
})
export class RegistroAutorComponent {
  isCreacion: boolean;
  autorId: any;
  nombreCompleto:any;
  @Output() actualizacionRealizada = new EventEmitter<void>();
  constructor (private apiAutor:AutoresService,
    private dialogRef:MatDialogRef<RegistroAutorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,){
      this.isCreacion = this.data.isCreacion;
      this.autorId = this.data.element;
    }
    formAutor = new FormGroup({
      nombre : new FormControl('',[
        Validators.required
      ]),
      apellido: new FormControl('',[
        Validators.required
      ]),
    });
    formAutorCompleto = new FormGroup({
      nombreAutor: new FormControl
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
  ngOnInit(){
    if (!this.isCreacion) {
      // Modo de edición
      // Realizar una solicitud al servicio para obtener los datos de la editorial según this.editorialId
      this.apiAutor.buscarAutorId(this.autorId).subscribe((response:Autor) => {
        if(response){
          this.formAutorCompleto.patchValue({
            nombreAutor: response.nombreAutor
          });
        }
      })
    }
  }
  addAutor() {
    if (this.isCreacion) {
      // Lógica para creación
      console.log(this.autorId)
      const datos = new FormData();
      
      if(this.formAutor.value){
        const nombre = this.formAutor.value.nombre;
        const apellido = this.formAutor.value.apellido?.toUpperCase();
        this.nombreCompleto= apellido+" "+ nombre
      }
      const autorO:Autor={
        'nombreAutor': this.nombreCompleto,
      }
      
      this.apiAutor.addAutor(autorO).subscribe((response) => {
        if (response) {
          console.log('Se registró correctamente');
          this.succes();
          // EditorialComponent.cargarEditorial()
          this.actualizacionRealizada.emit();
        }
      });
    } else {
      console.log(this.autorId)
      // Lógica para edición
      // Obtener el ID del elemento a editar desde this.data.id y realizar la edición correspondiente
      // this.apiEditorial.buscarEditorialId(this.data.id).subscribe
      this.apiAutor.editarAutor(this.autorId,this.formAutorCompleto.value).subscribe((response)=>{
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
