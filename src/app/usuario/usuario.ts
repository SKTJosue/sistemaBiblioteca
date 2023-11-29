export interface Usuario{
    name?:string | null;
    apellidoP?:string | null;
    apellidoM?:string | null;
    email?:string | null;
    password?:string | null;
    password_confirmation?:string | null;
    rol?:string | null;
}
export class UsuarioTest{
    name: string = '';
}