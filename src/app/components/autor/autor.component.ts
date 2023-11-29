import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { response } from 'express';
import { AutoresService } from 'src/app/usuario/autor/autores.service';
import { RegistroAutorComponent } from '../registro-autor/registro-autor.component';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent {
  listaAutor:any;
  dataSource: MatTableDataSource<any>;
  columnas: any[] = ['Numero', 'nombreAutor', 'accion'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog:MatDialog, private apiAutor:AutoresService){
    this.dataSource = new MatTableDataSource<any>();
  }
  openRegistroAutorDialog(isCreacion: boolean, element?:any){
    const dialogRef = this.dialog.open(RegistroAutorComponent,{
      width: '400px',
      data: {isCreacion,element},
    });
    dialogRef.componentInstance.actualizacionRealizada.subscribe(()=>{
      this.cargarAutor();
    });
    dialogRef.afterClosed().subscribe(respuesta=>{
      this.cargarAutor();
    })
  }
  cargarAutor(){
    this.apiAutor.listAutor().subscribe(response=>{
      if(response){
        this.listaAutor=response.data
        this.dataSource = new MatTableDataSource<any>(response.data);
        this.dataSource.paginator = this.paginator
      }
    })
  }
  eliminar(id:any){
    this.apiAutor.eliminar(id).subscribe(response=>{
      if(response){
        console.log('se elimino correctamente');
        this.cargarAutor();
      }
    },error=>{
      console.log(error);
    })
  }
  ngOnInit(){
    this.cargarAutor();
  }
}
