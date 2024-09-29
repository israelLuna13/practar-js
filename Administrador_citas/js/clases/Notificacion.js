import {formulario} from "../selectores.js"
export default class Notificacion {
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
