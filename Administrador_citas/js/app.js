//-------------------------------------------------------selectores
const pacienteInput    = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput       = document.querySelector('#email');
const fechaInput       = document.querySelector('#fecha');
const sintomasInput    = document.querySelector('#sintomas');
const formulario       =document.querySelector('#formulario-cita')
const formularioInput  =document.querySelector('#formulario-cita input[type="submit"]')
const contenedorCitas  = document.querySelector('#citas')
//-------------------------------------------------------
let editando=false
//Objeto de cita
const citaObj = {
    id:generarId(),
    paciente:'',
    propietario:'',
    email:'',
    fecha:'',
    sintomas:''
}
//-------------------------------------------------------eventos
//el evento change se ejecuta cuando cambia algo en el input
pacienteInput.addEventListener('change',datoCita)
propietarioInput.addEventListener('change',datoCita)
emailInput.addEventListener('change',datoCita)
fechaInput.addEventListener('change',datoCita)
sintomasInput.addEventListener('change',datoCita)
formulario.addEventListener('submit',submitCita)

//-------------------------------------------------------CLASES

class Notificacion {
    constructor({texto,tipo})
    {
        this.texto = texto
        this.tipo=tipo
        this.mostrarNotificacion()
    }
    mostrarNotificacion()
    {
        const alert = document.createElement('DIV')
        alert.classList.add('text-center','w-full','p-3','text-white','my-5','alert'
            ,'uppercase','font-bold','text-sm')

        //eliminar alertas duplicadas , buscamos por la clase .alert
        const alertaPrevia = document.querySelector('.alert')
        // if(alertaPrevia)
        // {
        //     alertaPrevia.remove()
        // }
         alertaPrevia?.remove() //otra manera de hacerlo

        //si es de tipo error o exito
        this.tipo ==='error' ? alert.classList.add('bg-red-500'):alert.classList.add('bg-green-500')
        alert.textContent=this.texto

        //insertar en el dom
        //accedemos al elemento padre del formulario y insertarmos antes del formulario
        formulario.parentElement.insertBefore(alert,formulario)

        //quitar despues de 4 seg
        setTimeout(()=>{
            alert.remove()
        },4000)
    }
}

class AdminCitas
{
    constructor()
    {
        this.citas = []
    }
    agregar(cita)
    {
        this.citas=[...this.citas,cita]//guardamos las nuevas citas mas las citas que ya estaban
       // this.mostrar()
    }

    editar(citaActualizada)
    {
        //el map modifica el objeto y retorna uno nuevo
        //buscamos la cita y modificamos con la cita actualizada
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
        this.mostrar()
    }
    eliminar(id)
    {
        //guardamos las citas que no queremos eliminar
        this.citas = this.citas.filter(cita => cita.id !== id)
        this.mostrar()
        
    }
    mostrar()
    {
        //limpiar el html para que no se duplique
        while(contenedorCitas.firstChild)
        {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }

        //si hay citas
        if(this.citas.length ===0)
        {
            contenedorCitas.innerHTML=`<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`
            return
        }
        //generando las citas
        this.citas.forEach(cita => {
                const divCita = document.createElement('div');
                divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
            
                const paciente = document.createElement('p');
                paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
            
                const propietario = document.createElement('p');
                propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
            
                const email = document.createElement('p');
                email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
            
                const fecha = document.createElement('p');
                fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
            
                const sintomas = document.createElement('p');
                sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
                sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

                //botones de eliminar y editar
                const btnEditar = document.createElement('button');
                btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2','btn-editar');
                btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
                
                const clone = structuredClone(cita)//tomamos una copia del objeto                
                btnEditar.onclick =()=> cargarEdicion(clone)//agregamos un evento cuando se le de click

                const btnEliminar = document.createElement('button');
                btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
                btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                btnEliminar.onclick =()=> this.eliminar(cita.id)

                const contenedorBotones = document.createElement('DIV')
                contenedorBotones.classList.add('flex','justify-between','mt-10')

                //insertamos los botones
                contenedorBotones.appendChild(btnEliminar)
                contenedorBotones.appendChild(btnEditar)
            
                // Agregar al HTML
                divCita.appendChild(paciente);
                divCita.appendChild(propietario);
                divCita.appendChild(email);
                divCita.appendChild(fecha);
                divCita.appendChild(sintomas);
                divCita.appendChild(contenedorBotones)
                contenedorCitas.appendChild(divCita);
            });    
    }
}
//-------------------------------------------------------FUNCIONES
//escribimos en el atributo del objeto dependiento del input en el que se esta esbribiendo
function datoCita(event){
    citaObj[event.target.name] = event.target.value    
}

const citas = new AdminCitas()
function submitCita(event)
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
    if(editando)
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
    editando=false
}

function reiniciarObjetoCita()
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

function generarId(){
    return Math.random().toString(36).substring(2)+Date.now()
}
function cargarEdicion(cita){    
    Object.assign(citaObj,cita)//poenmos en el objeto la cita que se esta editando
    //llenamos los inputs
    pacienteInput.value=cita.paciente
    propietarioInput.value=cita.propietario
    emailInput.value=cita.email
    fechaInput.value=cita.fecha
    sintomasInput.value=cita.sintomas
    editando=true
    formularioInput.value = 'Guardar Cambios'
}
