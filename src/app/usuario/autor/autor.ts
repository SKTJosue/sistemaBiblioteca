export interface RespuestaApi {
    success: boolean;
    data: AutorApi[];
}
export interface Autor{
    nombreAutor?:string | null;
}
export interface IdAutor{
    id:number;
}
export interface AutorApi {
    id: number;
    nombreAutor: string;
    created_at: string;
    updated_at: string;
}