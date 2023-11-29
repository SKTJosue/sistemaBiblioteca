import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Libro, RespuestaApiLibros } from './libro';
@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private base= environment.base;
  private apiUrl = 'libros/';
  constructor(private http: HttpClient) { }
  addLibro(libro:Libro, imagen:File):Observable<any>{
    const url=this.base+this.apiUrl;
    const formData = new FormData();
    formData.append('imagen', imagen, imagen.name);
    formData.append('titulo_Principal', libro.titulo_Principal || '');
    formData.append('titulo_secundario', libro.titulo_secundario || '');
    formData.append('idioma_libro', libro.idioma_libro || '');
    formData.append('pais', libro.pais || '');
    formData.append('ciudad', libro.ciudad || '');
    formData.append('codigo_isbn', libro.codigo_isbn || '');
    formData.append('anio_publicacion', libro.anio_publicacion?.toString() || '');
    formData.append('numero_edicion', libro.numero_edicion?.toString() || '');
    formData.append('numero_paginas', libro.numero_paginas?.toString() || '');
    formData.append('topologia_libro', libro.topologia_libro || '');
    formData.append('contiene', libro.contiene || '');
    formData.append('incluye', libro.incluye || '');
    formData.append('tipo_adquisicion', libro.tipo_adquisicion || '');
    formData.append('indice', libro.indice || '');
    formData.append('estado', libro.estado || '');
    formData.append('editorial_id', libro.editorial_id?.toString() || '');
    formData.append('catalogacion_id', libro.catalogacion_id?.toString() || '');
    formData.append('topicos_id', libro.topicos_id?.toString() || '');
    return this.http.post<Libro>(url,libro) 
  }
  listLibro(){
    const url=this.base+this.apiUrl;
    return this.http.get<RespuestaApiLibros>(url)
  }
  buscarLibroId(id:string){
    const url=this.base+this.apiUrl;
    return this.http.get(url+id);
  }
  editarLibro(id:string,libro:Libro):Observable<Libro>{
    const url=this.base+this.apiUrl+id;
    return this.http.put<Libro>(url,libro)
  }
  eliminar(id:any){
    const url=this.base+this.apiUrl;
    return this.http.delete(url+id);
  }

}
