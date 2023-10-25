import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor, IdAutor, RespuestaApi } from './autor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  private base= environment.base;
  private apiUrl='autor/'
  constructor( private http: HttpClient) { }
  addAutor(autor:Autor):Observable<Autor>{
    const url=this.base+this.apiUrl;
    return this.http.post<Autor>(url,autor);
  }
  listAutor(){
    const url=this.base+this.apiUrl;
    return this.http.get<RespuestaApi>(url);
  }
  buscarAutorId(id:string){
    const url=this.base+this.apiUrl;
    return this.http.get(url+id);
  }
  editarAutor(id:string,autor:Autor):Observable<Autor>{
    const url=this.base+this.apiUrl+id;
    return this.http.put<Autor>(url,autor);
  }
  eliminar(id:string){
    const url=this.base+this.apiUrl;
    return this.http.delete(url+id)
  }
  buscarAutor(letra:string){
    const url= this.base+this.apiUrl+'busqueda/'+letra
    return this.http.get<IdAutor>(url)
  }
}
