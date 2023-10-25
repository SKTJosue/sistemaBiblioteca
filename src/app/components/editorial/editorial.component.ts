import { Component, NgModule, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistroEditorialComponent } from '../registro-editorial/registro-editorial.component';
import { EditorialesService } from 'src/app/usuario/editorial/editoriales.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css'],
  
})
export class EditorialComponent {
  listaEditorial:any;
  dataSource: MatTableDataSource<any>;
  columnas: any[] = ['Numero', 'nombreEditorial', 'accion'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog:MatDialog, private apieditorial:EditorialesService){
    this.dataSource = new MatTableDataSource<any>();
  }
  openRegistroEditorialDialog(isCreacion: boolean , element?: any) {
    const dialogRef = this.dialog.open(RegistroEditorialComponent, {
      width: '400px', // Ajusta el ancho según tus necesidades
      // Puedes agregar más opciones de configuración según lo requieras
      data: {isCreacion,element},
      
    });
    dialogRef.componentInstance.actualizacionRealizada.subscribe(() => {
      this.cargarEditorial(); // Actualizar los datos al recibir el evento de actualización realizada
    });
    dialogRef.afterClosed().subscribe(respuesta=>{
      console.log('se cerro correctamente')
      this.cargarEditorial();
    })
  }
  eliminar(id:number){
    console.log(id)
    this.apieditorial.eliminar(id).subscribe(response=>{
      if(response){
        console.log( 'se elimino correctamente');
        this.cargarEditorial()
      }
    },error=>{
      console.log(error);})
  }
  ngOnInit(): void{
    this.cargarEditorial();
  }
  cargarEditorial(){
    console.log('entro')
    this.apieditorial.listEditorial().subscribe(respuesta=>{
      this.listaEditorial=respuesta.data
      this.dataSource = new MatTableDataSource<any>(respuesta.data);
      this.dataSource.paginator = this.paginator;
    })
  }
  click(elemento:any){
    console.log(elemento)
  }
}
