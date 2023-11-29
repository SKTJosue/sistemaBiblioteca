export interface Libro{
    id?:undefined;
    titulo_Principal?:string|null;
    titulo_secundario?:string|null;
    idioma_libro?:string|null;
    pais?:string|null;
    ciudad?:string|null;
    codigo_isbn?:string|null;
    anio_publicacion?:string|number|null|undefined,
    numero_edicion?:string|number|null|undefined,
    numero_paginas?:string|number|null|undefined,
    topologia_libro?:string|null;
    contiene?:string|null;
    incluye?:string|null;
    tipo_adquisicion?:string|null;
    indice?:string|null;
    estado?:string|null;
    editorial_id?:string|number|null;
    catalogacion_id ?:number|null;
    topicos_id?:number|null;
}
export interface RespuestaApiLibros{
    success:boolean;
    data:Libro[];
}