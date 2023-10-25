import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Estudiante,RepuestaApiEstudiante } from './estudiante';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private base=environment.base;
  private apiUrl='estudiante/';
  private EstudianteId:any;
  constructor(private http:HttpClient) { }
  addEstudiante(estudiante:Estudiante):Observable<Estudiante>{
    const url=this.base+this.apiUrl;
    return this.http.post<Estudiante>(url,estudiante);
  }
  listEstudiante(){
    const url=this.base+this.apiUrl;
    return this.http.get<RepuestaApiEstudiante>(url);
  }
  buscarEstudianteId(id:string){
    const url=this.base+this.apiUrl;
    return this.http.get(url+id);
  }
  editarEstudiante(id:string,estudiante:Estudiante):Observable<Estudiante>{
    const url=this.base+this.apiUrl+id;
    return this.http.put<Estudiante>(url,estudiante);
  }
  eliminar(id:string){
    const url=this.base+this.apiUrl;
    return this.http.delete(url+id)
  }
  agarrarId(id:any){
    this.EstudianteId = id
  }
  devolverId(){
    return this.EstudianteId
  }
  // buscarAutor(letra:string){
  //   const url= this.base+this.apiUrl+'busqueda/'+letra
  //   return this.http.get<IdAutor>(url)
  // }  
}
