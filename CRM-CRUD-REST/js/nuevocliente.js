import { showAlert ,checkInput} from "./funciones.js";
import { newCustomer } from "./API.js";
(function(){

    const formulario = document.querySelector('#formulario')
    
    formulario.addEventListener('submit',CheckCustomer)

    function CheckCustomer(e)
    {
        e.preventDefault()
        const name = document.querySelector('#nombre').value
        const email = document.querySelector('#email').value
        const phone = document.querySelector('#telefono').value
        const company = document.querySelector('#empresa').value

        const customer = {
            name,
            email,
            phone,
            company
        }
    // every check each elemt of the object with the same condition
    if(!checkInput(customer)){
        showAlert('All input are required');
        return
    }
    newCustomer(customer)

    }

  
})();