export interface Catalogacion{
    id?: undefined;
    inventario?:string | null;
    codigoAutor?:string | null;
    codigoLibro?:string | null;
    ejemplar?:string | null;
    tomo?:string | null;
    volumen?:string | null;
}
export interface CatalogacionApi{
    id:number;
    message:string;
}