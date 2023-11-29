import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Topico } from './topico';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TopicosService {

  constructor(private http:HttpClient) { }
  private base = environment.base;
  private url = 'topico/'
  addTopicos(topicos:Topico):Observable<Topico>{
    const apiUrl = this.base+ this.url
    return this.http.post(apiUrl,topicos)
  }
  listaTopicos(){
    const apiUrl = this.base+this.url;
    return this.http.get(apiUrl);
  }
  buscarTopicoId(id:string){
    const apiUrl=this.base+this.url+id
    return this.http.get(apiUrl)
  }
  editarTopico(id:string,topicos:Topico):Observable<Topico>{
    const apiUrl=this.base+this.url+id;
    return this.http.put(apiUrl, topicos);
  }
  eliminar(id:string){
    const url=this.base+this.url;
    return this.http.delete(url+id);
  }
}
