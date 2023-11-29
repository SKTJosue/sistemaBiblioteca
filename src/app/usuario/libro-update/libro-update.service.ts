import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibroUpdateService {
  private datosLibro: any;
  constructor() { }
  setDatosLibro(datos: any) {
    this.datosLibro = datos;
  }

  getDatosLibro() {
    return this.datosLibro;
  }
}
