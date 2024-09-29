import { generarId } from "./funciones.js"
// export let editando=false
export const editando={
    value:false
}

//Objeto de cita
export const citaObj = {
    id:generarId(),
    paciente:'',
    propietario:'',
    email:'',
    fecha:'',
    sintomas:''
}