import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Editorial, RespuestaApiEditorial, idEditorial } from './editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialesService {

  constructor(private http:HttpClient) { }
  private base = environment.base;
  private url='editorial/'
  addEditorial(editorial:Editorial):Observable<Editorial>{
    const apiUrl=this.base+this.url;
    return this.http.post<Editorial>(apiUrl,editorial);
  }
  listEditorial(){
    const apiUrl=this.base+this.url;
    return this.http.get<RespuestaApiEditorial>(apiUrl);
  }
  buscarEditorialId(id:string){
    const apiUrl=this.base+this.url+id;
    return this.http.get(apiUrl);
  }
  editarEditorial(id:string,editorial:Editorial):Observable<Editorial>{
    const apiUrl=this.base+this.url+id;
    return this.http.put<Editorial>(apiUrl+'/',editorial)
  }
  eliminar(id:any){
    const apiUrl=this.base+this.url;
    return this.http.delete(apiUrl+id);
  }
  busquedaEditorial(letra:string){
    const apiUrl=this.base+this.url+'busqueda/'+letra
    return this.http.get<idEditorial>(apiUrl)
  }
}
