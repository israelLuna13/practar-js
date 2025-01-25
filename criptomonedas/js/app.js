const criptoMonedasSelect = document.querySelector('#criptomonedas')
const monedasSelect = document.querySelector('#moneda')
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')

//write in the object when the user select some 
//the name the attribute most same that the name of the select
const objBusqueda = {
    moneda :'',
    criptomoneda :''
}
//create promise
//in this case we use the promise to use de data in other functions
//if this promise only return the data , we can don't user this promise and use other then in the fetch
//the objetive this promise is take the data for do other stuff con then , before sent to other then
const obtenerCriptomoneda =criptoMonedas => new Promise(resolve => {
    // const filtrado = criptoMonedas.filter(cripto => cripto.CoinInfo.FullName.includes('Bitcoin'));
    // resolve(filtrado);
    resolve(criptoMonedas)
})

//when the page upload will execute the function
document.addEventListener('DOMContentLoaded',()=>{
    consultarCriptoMonedas()
    formulario.addEventListener('submit',submitFormulario)
    criptoMonedasSelect.addEventListener('change',leerValor)
    monedasSelect.addEventListener('change',leerValor)
})

async function consultarCriptoMonedas(){
    const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        const criptomonedas = await obtenerCriptomoneda(resultado.Data)
        selectCriptomonedas(criptomonedas)
    } catch (error) {
        console.log(error);
        
    }


    // fetch(url)
    //     .then(respuesta => respuesta.json())//sent data to other .then
    //     .then(resultado => obtenerCriptomoneda(resultado.Data)) // promisa that return data ,
    //     .then(criptoMonedas => selectCriptomonedas(criptoMonedas))
}

function selectCriptomonedas(criptoMonedas)
{
    criptoMonedas.forEach(cripto =>{
        const {FullName, Name} = cripto.CoinInfo
        const option = document.createElement('option')
        option.value = Name
        option.textContent = FullName
        //put data in the select
        criptoMonedasSelect.appendChild(option)
    })

   
}
function submitFormulario(e){
    e.preventDefault()
    //validate
    const {moneda,critptomoneda} = objBusqueda
    if(moneda === '' || critptomoneda === '')
    {
        mostrarAlerta('The inputs is required')
        return;
    }
    //query api with data of form
    consultarAPI()
}
function leerValor(e)
{    //write on the object
    //e.target.name is the name of select 
    //e.target is values that user select
    objBusqueda[e.target.name] = e.target.value
}

function mostrarAlerta(message)
{
    //if there is not exist a alert
    const existeError = document.querySelector('.error')
    if(!existeError)
    {
        const divMensage = document.createElement('div')
        divMensage.classList.add('error')
    
        divMensage.textContent = message
    
        formulario.appendChild(divMensage)
    
        setTimeout(() => {
            divMensage.remove()
        }, 3000);

    }
  
    
}

async function consultarAPI(){
    const {moneda,criptomoneda} = objBusqueda
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    mostrarSpinner()

    try {
        const respuesta = await fetch(url)
        const cotizacion = await respuesta.json()
        mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        
    } catch (error) {
        console.log(error);
        
    }

    // fetch(url)
    //     .then(respuesta => respuesta.json())
    //     .then(cotizacion => mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]))

}

function mostrarCotizacionHTML(cotizacion)
{
    limparHTML()
    const {PRICE, HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE} = cotizacion
    const precio = document.createElement('p')
    precio.classList.add('precio')
    precio.innerHTML = `The price is <span>${PRICE}</span>`

    const precioAlto = document.createElement('p')
    precioAlto.innerHTML = `<p>Price more high of day <span>${HIGHDAY}</spam></p>`

    const precioBajo = document.createElement('p')
    precioBajo.innerHTML = `<p>Price more low of day <span>${LOWDAY}</spam></p>`

     const ultimasHoras = document.createElement('p')
     ultimasHoras.innerHTML = `<p>Price last 24 hours <span>${CHANGEPCT24HOUR}%</spam></p>`

     const ultimaActualizacion = document.createElement('p')
     ultimaActualizacion.innerHTML = `<p>last update <span>${LASTUPDATE}</spam></p>`

    resultado.appendChild(precio)   
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(ultimaActualizacion)
}

function limparHTML(){
    while(resultado.firstChild){
            resultado.removeChild(resultado.firstChild)
    }
}
//problema con el spinner, se muestra verticalmente
function mostrarSpinner()
{
    limparHTML()
    const spinner = document.createElement('div')
    spinner.classList.add('spinner')

    spinner.innerHTML = `
            <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            </div>
    `
    resultado.appendChild(spinner)
}