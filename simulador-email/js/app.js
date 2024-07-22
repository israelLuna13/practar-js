//cuando el html este cargado
document.addEventListener('DOMContentLoaded',function(){

    const email = {
        email:'',
        asunto:'',
        mensaje:''
    }

    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario =  document.querySelector('#formulario')
    const btnSubmit =  document.querySelector('#formulario button[type="submit"]')
    const btnReset =  document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')
    //registrar eventos a los elementos
    //se ejecuta cuando escribimos en el input
    //no se le pone el () a la funcion cuando la llamamos porque eso ejecutaria la funcion sin importar el evento que tenga 
    inputEmail.addEventListener('input',validar)
    inputAsunto.addEventListener('input',validar)
    inputMensaje.addEventListener('input',validar)
    formulario.addEventListener('submit',enviarEmail)

    //cuando se le de click al boton de resetear formulario
    btnReset.addEventListener('click',function(e){
        //desactivamos la accion por default
        e.preventDefault()
        resetFormulario()
    })

    function enviarEmail(e){
        //desactivamos la accion por default
        e.preventDefault()
        //ponemos estas clases en elemento que tiene el id spinner
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')

        //despues de 3 segundos ocultamos el spinner
        setTimeout(()=>{
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')  
                //reiniciar el objeto
                resetFormulario()

                //crear una alerta
                const alertaExito = document.createElement('P')
                alertaExito.classList.add('bg-green-500','text-white','p-2', 'text-center','rounded-lg', 'mt-10','text-sm','uppercase')
                alertaExito.textContent='Mensaje enviado correctamente'
                formulario.appendChild(alertaExito)
                setTimeout(()=>{
                    alertaExito.remove();
                },3000)
        },3000)
    }

    function validar(e){
        //validamos que los campos no esten vacios
        if(e.target.value.trim() == ''){
            //con e.target.parentElement accedemos al elemento padre del elemento en el que estamos
            /**
             * div - elemento padre
             *      div -elemento actual
             * 
             */
            mostrarAlerta(`El Campor ${e.target.id} es obligatorio`,e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        //si el campo es de email y no es un email valido
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            //le pasamos el mensaje y el elemento padre del elemento actual
            mostrarAlerta(`El email no es valido`,e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        limpiarAlerta(e.target.parentElement)
        //asignar los valores 
        email[e.target.name] = e.target.value.trim().toLowerCase()
        //comprobar el objeto de email
        comprobarEmail()
    }

    //la referencia es el elemento en el que se esta en el momento en el que se llama el metodo
    function mostrarAlerta(mensaje,referencia)
        {
            //antes de volver a mostrar una alerta, quitamos la que ya estaba pero solo del elemento correspondiente para que no afecte a los demas elementos
            limpiarAlerta(referencia) 
            //generar html
            //creamos un parrafo , le colocamos un texto y le agregamos clases
            const error = document.createElement('P')
            error.textContent = mensaje
            error.classList.add('bg-red-600','text-white','p-2','text-center')
            //inyectar el error en el elemento padre del input
            //appenchild lo pone hasta el final
            referencia.appendChild(error)
        }

    function limpiarAlerta(referencia){
        //comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove()
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarEmail(){
        //si algunos de los atributos del objeto email esta en blanco
        if(Object.values(email).includes('')){
            //desactivamos el boton
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled=true
            return  
    }
    //de lo contrario activamos el boton
            btnSubmit.classList.remove('opacity-50')
            btnSubmit.disabled = false
}

    function resetFormulario (){
        //reiniciar el objeto
        email.email=''
        email.asunto=''
        email.mensaje=''
        //reset es un metodo de los formularios
        formulario.reset()
        comprobarEmail()
    }
})