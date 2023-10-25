import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/usuario/usuario';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
  

export class UsuarioCrearComponent implements OnInit {  
    
  constructor(private apiUsuario:UsuarioService, private router:Router) { }
  data: boolean=true ;
  formUsuario = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^\S.*$/),
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    apellidoP: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^\S.*$/),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    apellidoM: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^\S.*$/),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern(/^\S.*$/),
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ]),
    password_confirmation : new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ]),
    rol:new FormControl('',
      Validators.required)
  });
  ngOnInit(): void {
  }
  // get nombre(): string {
  //   const nombre = this.formUsuario.value.nombre;
  //   return `${nombre}`;
  // }
  // get apellidoP(): string{
  //   const apellidoP = this.formUsuario.value.apellidoP;
  //   return`${apellidoP}`;
  // }
  // get apellidoM(): string{
  //   const apellidoM = this.formUsuario.value.apellidoM;
  //   return`${apellidoM}`;
  // }
  // get email():string{
  //   const email= this.formUsuario.value.email;
  //   return `${email}`;
  // }
  // get password(): string{
  //   const password = this.formUsuario.value.password;
  //   return `${password}`;
  // }
  // get password_confirmation(): string{
  //   const password = this.formUsuario.value.password_confirmation;
  //   return `${password}`;
  // }
  // get rol(): string{
  //   const rol = this.formUsuario.value.Cargo;
  //   return `${rol}`;
  // }
  //inicio de onSubmit
  onSubmit(form:Usuario){ 
      console.log(form)
      this.apiUsuario.addUser(form).subscribe( data =>{
        console.log(data);
        if(data){
          alert('se registro exitosamente');
          this.formUsuario.reset();
          this.router.navigate(['/usuario-registrados'])
        }
      }, error=>{
        // alert(error);
        console.log(error);
      });
    
  }
  //end onsubmit
  
  cancelar(){
    alert('esta cancelando las acciones')
    this.router.navigate(['/usuario-registrados'])
  }
}


