import Notificacion from "./clases/Notificacion.js"
import AdminCitas from "./clases/AdminCitas.js"
import { citaObj, editando } from "./variables.js";
import { formulario,formularioInput,pacienteInput,propietarioInput,emailInput,fechaInput,sintomasInput } from "./selectores.js";
const citas  = new AdminCitas()
export function submitCita(event)
{
    event.preventDefault();    
    //si objeto cita tiene atributos en blanco
    if(Object.values(citaObj).some(valor => valor.trim() === ''))
    {
         new Notificacion({
            texto:'Todos los campos son obligatorios',
            tipo:'error'
         })
        return
    }
    if(editando.value)
    {
        citas.editar({...citaObj})
        new Notificacion({
            texto:'Guardado Correctamente',
            tipo:'exito'
        })
    }else{
        citas.agregar({...citaObj})
        new Notificacion({
            texto:'Paciente Agregado',
                tipo:'exito'
        })
    }

    citas.mostrar()
    formulario.reset()
    reiniciarObjetoCita()
    formularioInput.value = 'Registrar Paciente'
    editando.value=false
}

export function reiniciarObjetoCita()
{
    //id:generarId()
    //reiniciar objeto
    //citaObj.id:generarId()
    // citaObj.paciente=''
    // citaObj.propietario=''
    // citaObj.email=''
    // citaObj.fecha=''
    // citaObj.sintomas=''
    Object.assign(citaObj,{
        id:generarId(),
        paciente:'',
        propietario:'',
        email:'',
        fecha:'',
        sintomas:''
    })
}

export function generarId(){
    return Math.random().toString(36).substring(2)+Date.now()
}
export function cargarEdicion(cita){    
    Object.assign(citaObj,cita)//poenmos en el objeto la cita que se esta editando
    //llenamos los inputs
    pacienteInput.value=cita.paciente
    propietarioInput.value=cita.propietario
    emailInput.value=cita.email
    fechaInput.value=cita.fecha
    sintomasInput.value=cita.sintomas
    editando.value=true
    formularioInput.value = 'Guardar Cambios'
}
export function datoCita(event){
    citaObj[event.target.name] = event.target.value    
}
