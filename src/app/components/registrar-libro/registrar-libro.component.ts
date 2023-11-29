import { formatCurrency } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { response } from 'express';
import { async } from 'rxjs';
import { Autor, AutorApi, IdAutor } from 'src/app/usuario/autor/autor';
import { AutoresService } from 'src/app/usuario/autor/autores.service';
import { CatalogacionesService } from 'src/app/usuario/catalogacion/catalogaciones.service';
import { EditorialApi } from 'src/app/usuario/editorial/editorial';
import { EditorialesService } from 'src/app/usuario/editorial/editoriales.service';
import { LibroUpdateService } from 'src/app/usuario/libro-update/libro-update.service';
import { LibrosService } from 'src/app/usuario/libros/libros.service';
import { TopicosService } from 'src/app/usuario/topicoBusqueda/topicos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-libro',
  templateUrl: './registrar-libro.component.html',
  styleUrls: ['./registrar-libro.component.css']
})

export class RegistrarLibroComponent implements OnInit {
  autor: string[] = [];
  editorial: string[]=[];
  selectedAuthors: string[] = [];
  dataField: object ={text:'id' ,value:'id'}
  autorAux:any[]=[];
  listAutor:number[]=[];
  nuevosTags: string[] = [];
  idCatalogacion:any;
  idTopicos: any;
  imagenPreview: string | ArrayBuffer | null = "";
  idEditorial: any;
  idLibro: any;
  anio: string | null | undefined;
  edicion: string | null | undefined;
  pagina: string | null | undefined;
  file:any;
  constructor(private apiAutor:AutoresService,  
    private apiEditorial:EditorialesService, 
    private apiLibros: LibrosService,
    private apiTopicoBusqueda: TopicosService,
    private apiCatalogacion: CatalogacionesService,
    private router:Router,
    private intermedioUpdate:LibroUpdateService
    ) { }
  // textoBusqueda:string;

  formLibro = new FormGroup({
    titulo_Principal: new FormControl('',[
      Validators.required,
    ]),
    titulo_secundario: new FormControl('',[
    ]),
    idioma_libro : new FormControl('',[
      Validators.required
    ]),
    pais: new FormControl('',[
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),
    ciudad: new FormControl('',[
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),
    codigo_isbn: new FormControl('',[
      Validators.required,

    ]),
    anio_publicacion: new FormControl('',[
      Validators.required,
      this.validarAnio,
      Validators.pattern('^[0-9]*$')
    ]),
    numero_edicion: new FormControl('',[
      Validators.pattern('^[0-9]*$')
    ]),
    numero_paginas: new FormControl('',[
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]),
    topologia_libro: new FormControl('',[
      Validators.required,
    ]),
    contiene: new FormControl('',[
      Validators.required,
    ]),
    incluye: new FormControl('',[
      Validators.required,
    ]),
    tipo_adquisicion: new FormControl('',[
      Validators.required
    ]),
    indice: new FormControl('',[
      Validators.required,
    ]),
    editorial_id: new FormControl('',[]),
    catalogacion_id: new FormControl(null),
    topicos_id: new FormControl(null),
  });
  FormCatalogacion = new FormGroup({
    inventario: new FormControl('',[
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]),
    codigoAutor : new FormControl('',[
      Validators.required,
    ]),
    codigoLibro: new FormControl('',[
      Validators.required,
    ]),
    ejemplar:new FormControl('',Validators.required),
    tomo:new FormControl('',Validators.required),
    volumen:new FormControl('',Validators.required),
  });

  formAutor = new FormGroup({
    nombreAutor: new FormControl('',Validators.required),
});
  formEditorial= new FormGroup({
    nombreEditorial:new FormControl('',Validators.required),
});
formBusqueda = new FormGroup({
  materia: new FormControl('',Validators.required),
  topicoBusqueda: new FormControl('',Validators.required)
});
validarAnio(control: AbstractControl): ValidationErrors | null {
  let anio = control.value;
  anio = Number(anio)
  const currentYear = new Date().getFullYear();
  if (isNaN(anio) || !Number.isInteger(anio) || anio < 0 || anio > currentYear) {
    return { 'anioInvalido': true };
  }
  return null;
}
  alertaCancelar(){
    Swal.fire({
      title: 'quieres no registrar este libro?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, detener Registro!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Se detuvo existosamente!',
          'El registro no fue guardado.',
          'success'
        )
        this.reseteo();
        this.irALibro();
      }
    })
  }
  reseteo(){
    this.FormCatalogacion.reset();
    this.formAutor.reset();
    this.formBusqueda.reset();
    this.formLibro.reset();
    this.formEditorial.reset();
  }
  
  ngOnInit() {
    this.buscarAutores();
    this.getAuthors();
    this.getEditoriales();
    const datosLibro = this.intermedioUpdate.getDatosLibro();
    console.log(datosLibro);
  }
  cargarImagen(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagenPreview = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  convertirFormGroupToFormData(formGroup: FormGroup): FormData {
    const formData = new FormData();
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.controls[controlName];
  
      if (control.value instanceof FileList) {
        for (let i = 0; i < control.value.length; i++) {
          formData.append(controlName, control.value[i]);
        }
      } else {
        formData.append(controlName, control.value);
      }
    });
  
    return formData;
  }
  autores(): Promise<void> {
    this.listAutor=[];
    let selectedValues = this.formAutor.get('nombreAutor')?.value;
  
    if (selectedValues) {
      const selectedValueArray = Array.isArray(selectedValues) ? selectedValues : [selectedValues];
  
      const promises = selectedValueArray.map(value =>
        this.apiAutor.buscarAutor(value).toPromise()
      );
  
      return Promise.all(promises).then(responses => {
        for (const response of responses) {
          const idAutor:number|undefined = response?.id;
          if(idAutor){
          this.listAutor.push(idAutor);
          }
        }
      }).catch(error => {
        console.error('Error al obtener los autores', error);
      });
    }
  
    return Promise.resolve();
  }
  
  datosEditorial(): Promise<void> {
    let selectedValuesEditorial = this.formEditorial.get('nombreEditorial')?.value;
  
    if (selectedValuesEditorial) {
      return this.apiEditorial.busquedaEditorial(selectedValuesEditorial).toPromise()
        .then(response => {
          this.idEditorial = response?.id;
        })
        .catch(error => {
          console.error('Error al obtener la editorial', error);
        });
    }
  
    return Promise.resolve();
  }
  datosCatalogacion(): Promise<void>{
    if(this.FormCatalogacion.valid){
      return this.apiCatalogacion.addCatalogacion(this.FormCatalogacion.value).toPromise()
        .then(response=>{
          this.idCatalogacion = response?.id;
        })
        .catch(error => {
          console.log('Error al obtener la editorial',error)
        });
    }
    return Promise.resolve();
  }
  datosTopicos():Promise<void>{
    if(this.formBusqueda.valid){
      return this.apiTopicoBusqueda.addTopicos(this.formBusqueda.value).toPromise()
      .then(response=>{
        this.idTopicos = response?.id;
      })
      .catch(error =>{
        console.log('error al obtener los topicos de busqueda',error)
      });
    }
    return Promise.resolve();
  }
  submit(){
    // this.apiCatalogacion.addCatalogacion(this.FormCatalogacion.value).subscribe(response=>{
    //   if(response){
    //     this.idCatalogacion = response.id;
    //     console.log('catalogacion',this.idCatalogacion);

    //   }
    // },error=>{console.log(error)})
    Promise.all([
      this.autores(),
      this.datosEditorial(),
      this.datosCatalogacion(),
      this.datosTopicos()
    ]).then(() => {
      console.log('lista autores', this.listAutor);
      console.log('editorialES', this.idEditorial);
      console.log('catalogacion id',this.idCatalogacion);
      console.log('topico id',this.idTopicos);
      // Aquí puedes continuar con el código que depende de los resultados
      // de las llamadas a la API
      this.anio = this.formLibro.get('anio_publicacion')?.value;
      this.edicion = this.formLibro.get('numero_edicion')?.value;
      this.pagina = this.formLibro.get('numero_paginas')?.value;
      const valores={
        pagina: this.pagina,
        numero_edicion: this.edicion,
        anio_publicacion: this.anio,
        editorial_id: this.idEditorial,
        catalogacion_id: this.idCatalogacion,
        topicos_id: this.idTopicos,
      }
      this.formLibro.patchValue(valores);
      console.log(this.formLibro.value);
      const formData = new FormData();
      formData.append('imagen', this.file, this.file.name);
      // Recorre todos los controles del formulario
      Object.keys(this.formLibro.controls).forEach(key => {
        const control = this.formLibro.get(key);
        if (control && control.value) {
          formData.append(key, control.value);
        }
      });
      this.apiLibros.addLibro(this.formLibro.value,this.file).subscribe(response=>{
        if(response){
          this.idLibro = response.id
          console.log(this.idLibro)
        }
      },error=>{ console.log(error)})
    }).catch(error => {
      console.error('Error al obtener los datos', error);
    });
      
      // this.apiLibros.addLibro(this.formLibro.value).subscribe(response=>{
      //   if(response){
      //     this.idLibro = response.id
      //     console.log(this.idLibro)
      //   }
      // },error=>{ console.log(error)})
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 2500
    })
  }
  
  irABiblioteca() {
    const bibliotecaTab = document.getElementById('biblioteca-tab');
    if (bibliotecaTab) {
      bibliotecaTab.click();
    }
  }

  irATopicos() {
    const bibliotecaTab = document.getElementById('topicos-tab');
    if (bibliotecaTab) {
      bibliotecaTab.click();
    }
  }

  irALibro(){
    const libroTab = document.getElementById('libro-tab');
    if(libroTab){
      libroTab.click();
    }
  }
  buscarAutores(){
    // console.log('lol');
    this.apiAutor.listAutor().subscribe(response => {
      const authorData: AutorApi[] = response.data;
      this.autorAux = authorData.map(author=>author);
      console.log('objeto',this.autorAux)
    });
  }
  getAuthors() {
    this.apiAutor.listAutor().subscribe(response => {
      const authorData: AutorApi[] = response.data;
      this.autor = authorData.map(author=>author.nombreAutor);
      console.log('estas aqui',this.autor)
    });
  }
  getEditoriales(){
    this.apiEditorial.listEditorial().subscribe(response=>{
      const editorialData: EditorialApi[] = response.data;
      this.editorial = editorialData.map(editoriales=>editoriales.nombreEditorial)
    });
  }
  onFileChange(event: any): void {
    this.file=event.target.files[0];
    console.log(this.file)
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenPreview = reader.result;
          console
        };
        reader.readAsDataURL(file);
      } else {
        this.imagenPreview = '';
      }
    }
  }
}
