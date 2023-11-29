import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Catalogacion } from './catalogacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogacionesService {

  constructor( private http:HttpClient) { }
  private base = environment.base;
  private urlApi= 'catalogacion/'
  addCatalogacion(catalogacion:Catalogacion):Observable<Catalogacion>{
    const url = this.base+this.urlApi;
    return this.http.post<Catalogacion>(url,catalogacion);
  }
  listCatalogacion(){
    const url=this.base+this.urlApi;
    return this.http.get(url);
  }
  buscarCatalogacion(id:string){
    const url=this.base+this.urlApi+id;
    return this.http.get(url) 
  }
  editarCatalogacion(id:string,catalogacion:Catalogacion):Observable<Catalogacion>{
    const url=this.base+this.urlApi+id;
    return this.http.put<Catalogacion>(url,catalogacion);
  }
  eliminar(id:string){
    const url=this.base+this.urlApi
    return this.http.delete(url+id);
  }
}
