import {pacienteInput,propietarioInput,emailInput,fechaInput,sintomasInput,formulario} from "./selectores.js"
import { datoCita,submitCita } from "./funciones.js"
//-------------------------------------------------------eventos
//el evento change se ejecuta cuando cambia algo en el input
pacienteInput.addEventListener('change',datoCita)
propietarioInput.addEventListener('change',datoCita)
emailInput.addEventListener('change',datoCita)
fechaInput.addEventListener('change',datoCita)
sintomasInput.addEventListener('change',datoCita)
formulario.addEventListener('submit',submitCita)
//-------------------------------------------------------FUNCIONES

