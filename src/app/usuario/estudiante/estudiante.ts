export interface RepuestaApiEstudiante{
    succes:boolean;
    data:EstudianteApi[];
}
export interface Estudiante{
    nombre?:string|null;
    apellido?:string|null;
    numeroCelular?:string|number|null;
    nombreTutor?:string|null;
    apellidoTutor?:string|null;
    numeroCelularTutor?:number|string|null;
}
export interface EstudianteApi{
    id:number;
    nombre:string;
    apellido:string;
    numeroCelular:number;
    nombreTutor:string;
    apellidoTutor:string;
    numeroCelularTutor:number;
}