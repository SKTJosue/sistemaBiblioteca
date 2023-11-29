import { Component, OnInit,ElementRef, Inject } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-usuarios-registrados',
  templateUrl: './usuarios-registrados.component.html',
  styleUrls: ['./usuarios-registrados.component.css']
})
export class UsuariosRegistradosComponent implements OnInit {
  [x: string]: any;
  listaUsuario: any=[];
  filterPost='';
  constructor(private elementRef: ElementRef, 
    private apiUsuario: UsuarioService) { }
  data:boolean=true;
  
  
  ngOnInit(): void {
    // var s = document.createElement("script");
    // s.type = this.cargarUsuario;
    // s.src = "../assets/js/main.js";
    // this.elementRef.nativeElement.appendChild(s);
    this.cargarUsuario();
    
  }
  cargarUsuario(){
    this.apiUsuario.alluser().subscribe(
      respuesta=>{
        this.listaUsuario=respuesta
      });
  }
  eliminar(datos:string){
    console.log(datos)
    this.apiUsuario.eliminar(datos).subscribe(data=>{
      if(data){
        alert('se elimino el usuario correctamente');
        this.cargarUsuario();
      }
    },error=>{
      console.log(error)
    });
  }
  CargarUsuarioId(datos:string){
    
  }
}
