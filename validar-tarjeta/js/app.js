document.addEventListener('DOMContentLoaded',function(){
    const inputName = document.querySelector('#name')
    const inputCard = document.querySelector('#card')
    const inputDate = document.querySelector('#expired')
    const btnSubmit =  document.querySelector('#formulario button[type="submit"]')
    const btnReset =  document.querySelector('#formulario button[type="reset"]')

    const card = {
        name:'',
        card:'',
        expired:'hola'
    }

    //registrar los eventos
    inputName.addEventListener('input',validar);
    inputCard.addEventListener('input',validar);
    inputDate.addEventListener('input',validar);
    formulario.addEventListener('submit',cardValidation)
    btnReset.addEventListener('click',function(){
        e.preventDefault()
        resetFormulario()
    })

    function cardValidation(e){
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
                alertaExito.textContent='Card validate'
                formulario.appendChild(alertaExito)
                setTimeout(()=>{
                    alertaExito.remove();
                },3000)
        },3000)

    }


    function validar(e){
        const parent = e.target.parentElement //elemento padre del elemento acual

       if(e.target.value.trim() == ''){
        mostrarAlerta(`El campo ${e.target.id}`,parent)
        card[e.target.name]= ''
        comprobateCard()
        return
       }

       if(e.target.id === 'card' && !validateCard(e.target.value)){
        mostrarAlerta('The number card not valid',parent)
        card[e.target.name]= ''
        comprobateCard()
        return
       }

       if(e.target.id === 'expired' && !validateDate(e.target.value)){
        mostrarAlerta('The Date card not valid',parent)
        card[e.target.name]= ''
        comprobateCard()
        return
       }
       clearAlert(parent)
       card[e.target.name]=e.target.value.trim()
       comprobateCard()
    }

    function mostrarAlerta(msg,reference){
        clearAlert(reference)
        const error = document.createElement('P')
        error.textContent=msg
        error.classList.add('bg-red-600','text-white','p-2','text-center')
        reference.appendChild(error)
    }

    function clearAlert(reference){
        const alert = reference.querySelector('.bg-red-600')
        if(alert){
            alert.remove()
        }
    }

    function validateCard(card){
     const regex =  /^(?:\d[ -]?){13,19}\d$/
     const result = regex.test(card)
     console.log(result);
     return result
    }

    function validateDate(date) {
        //expresion regular para que coincida con este formato YY-MM-DD
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) {
            console.log('Date format is not valid:', date);
            return false;
        }

        // Verificar que la fecha no esté en el pasado
        const [year, month, day] = date.split('-').map(Number);
        const expirationDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        const isValid = expirationDate >= currentDate;

        console.log('Date is valid:', isValid);
        return isValid;

    }

    function comprobateCard(){

          //si algunos de los atributos del objeto card esta en blanco
          if(Object.values(card).includes('')){
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
        card.name=''
        card.card=''
        card.expired=''
        //reset es un metodo de los formularios
        formulario.reset()
        comprobateCard()
    }

})

