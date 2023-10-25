import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  base= environment.base;
  register='register';
  allUser='usuarios';
  deleteUser='usuario/'
  constructor(private http: HttpClient) { 
  }
  addUser(usuario:Usuario):Observable<Usuario>{
    const url=this.base+this.register
    console.log(url)
    return this.http.post<Usuario>(url,usuario);

  }
  alluser(){
    return this.http.get(this.base.concat('',this.allUser));
  }
  eliminar(id:string){
    const url=this.base+this.deleteUser;
    return this.http.delete(url+id)
  }
}
