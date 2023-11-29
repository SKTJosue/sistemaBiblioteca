export interface RespuestaApiEditorial{
    success: boolean;
    data: EditorialApi[];
}
export interface EditorialApi{
    id:number;
    nombreEditorial:string;
    created_at: string;
    updated_at: string;
}
export interface idEditorial{
    id:number;
}
export interface Editorial{
    nombreEditorial?:string | null;
}