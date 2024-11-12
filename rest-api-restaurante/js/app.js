let cliente = {
    mesa:'',
    hora:'',
    pedido:[]
}

const categorias = {
    1:'Comida',
    2:'Bebidas',
    3:'Postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente')

btnGuardarCliente.addEventListener('click',guardarCliente)

function guardarCliente(){
    const mesa = document.querySelector('#mesa').value
    const hora = document.querySelector('#hora').value
    const camposVacios = [mesa,hora].some(campo=> campo === '')
    if(camposVacios){
        //if there is not alert
        const existeAlert = document.querySelector('.invalid-feedback')
        if(!existeAlert)
        {
            const alerta = document.createElement('div')
            alerta.classList.add('invalid-feedback','d-block','text-center')
            alerta.textContent = 'All inputs is required'
            document.querySelector('.modal-body form').appendChild(alerta)

            setTimeout(() => {
                alerta.remove()
            }, 3000);
        }
        return  
    }
    //add data form to object
    cliente = {...cliente, mesa,hora}

    //close modal
    const modalFormulario = document.querySelector('#formulario')
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario)
    modalBootstrap.hide()

    //show sections
    mostrarSecciones()

    //get data api json server
    obtenerPlatillos()
}

function mostrarSecciones(){
    const seccionesOcultras = document.querySelectorAll('.d-none')
    seccionesOcultras.forEach(seccion => seccion.classList.remove('d-none'))
}

function obtenerPlatillos(){
    const url = 'http://localhost:4000/platillos'

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error=> console.log(error))
}

function mostrarPlatillos(platillos)
{
    const contenido = document.querySelector('#platillos .contenido')

    platillos.forEach(platillo =>{
        const row = document.createElement('div')
        row.classList.add('row','py-3','border-top')

        const nombre = document.createElement('div')
        nombre.classList.add('col-md-4')
        nombre.textContent = platillo.nombre

        const precio = document.createElement('div')
        precio.classList.add('col-md-3','fw-bold')
        precio.textContent = `$${platillo.precio}`

        const categoria = document.createElement('div')
        categoria.classList.add('col-md-3')
        categoria.textContent = categorias[platillo.categoria]

        const inputCantidad = document.createElement('input')
        inputCantidad.type = 'number'
        inputCantidad.min = 0
        inputCantidad.value = 0
        inputCantidad.id = `producto-${platillo.id}`
        inputCantidad.classList.add('form-control')

        //lo ponemos de esta forma para poner pasarle parametros a la funcion pero sin 
        //que se mande llamar hasta que se le click
        inputCantidad.onchange = function(){
            const cantidad = parseInt(inputCantidad.value)            
            agregarPlatillo({...platillo,cantidad})//ponemos una copia de platillo , usamos esta forma para que se pongan los atributos del objeto dentro del objeto y no el objeto dentro del objeto
        }

        const agregar = document.createElement('div')
        agregar.classList.add('col-md-2')
        agregar.appendChild(inputCantidad)

        row.appendChild(nombre)
        row.appendChild(precio)
        row.appendChild(categoria)
        row.appendChild(agregar)
        contenido.appendChild(row)
    })
}

function agregarPlatillo(producto)
{
    //get currenty product
    let {pedido} = cliente
    //check if amount is > 0
    if(producto.cantidad > 0)
    {
        //check if element exist in array
        if(pedido.some(p => p.id === producto.id)){
            //update amount
            //map return nuevo array
            const pedidoActualizado = pedido.map( p => {
                if(p.id === producto.id){
                    p.cantidad = producto.cantidad
                }

                return p
            })
            //put new element in array cliente.pedido
            // we take copy that data in cliente and add new 
            cliente.pedido = [...pedidoActualizado]

        }else{
            //create new element in the array
            cliente.pedido = [...pedido,producto]
        }
    }else
    {
        //delete when amount is 0
        //filter return elements that we don't want delete
        const resultado = pedido.filter( elem => elem.id !== producto.id)
        cliente.pedido=[...resultado]        
    }
    //clear html previusly
    limpiarHTML()

    //show order
    actualizarResumen()
}

function actualizarResumen(){
    const contenido = document.querySelector('#resumen .contenido')

    const resumen = document.createElement('div')
    resumen.classList.add('col-md-6','card','py-5','px-3','shadow')
//mesa
    const mesa = document.createElement('p')
    mesa.textContent = 'Mesa'
    mesa.classList.add('fw-bold')

    const mesaSpan = document.createElement('div')
    mesaSpan.textContent = cliente.mesa
    mesaSpan.classList.add('fw-bold')

    //hour 
    const hora = document.createElement('p')
    hora.textContent = 'Hora'
    hora.classList.add('fw-bold')

    const horaSpan = document.createElement('div')
    horaSpan.textContent = cliente.hora
    horaSpan.classList.add('fw-bold')

    mesa.appendChild(mesaSpan)
    hora.appendChild(horaSpan)

    //title section
    const heading = document.createElement('h3')
    heading.textContent = 'Platillos Consumidos'
    heading.classList.add('my-4','text-center')

    //show ordes
    const grupo = document.createElement('ul')
    grupo.classList.add('list-group')

    const{pedido} = cliente;

    pedido.forEach(articulo => {
        const {nombre,cantidad,precio,id} = articulo
        const lista = document.createElement('li')
        lista.classList.add('list-group-item')

        const nombreEl= document.createElement('h4')
        nombreEl.classList.add('my-4')
        nombreEl.textContent = nombre

        //
        const cantidadEle = document.createElement('p')
        cantidadEle.classList.add('fw-bold')
        cantidadEle.textContent = 'Cantidad:'

        const cantidadValor = document.createElement('span')
        cantidadValor.classList.add('fw-normal')
        cantidadValor.textContent = cantidad

          //price
          const precioEle = document.createElement('p')
          precioEle.classList.add('fw-bold')
          precioEle.textContent = 'Precio:'
  
          const precioValor = document.createElement('span')
          precioValor.classList.add('fw-normal')
          precioValor.textContent = `$${precio}`

          //sub amount
          const subtotalEl = document.createElement('p')
          subtotalEl.classList.add('fw-bold')
          subtotalEl.textContent = 'Subtotal:'
  
          const subTotalValor = document.createElement('span')
          subTotalValor.classList.add('fw-normal')
          subTotalValor.textContent = calcularSubtotal(precio,cantidad)

        //add value a her containers
        cantidadEle.appendChild(cantidadValor)
        precioEle.appendChild(precioValor)
        subtotalEl.appendChild(subTotalValor)


        //add elemt to LI
        lista.appendChild(nombreEl)
        lista.appendChild(cantidadEle)
        lista.appendChild(precioEle)
        lista.appendChild(subtotalEl)

        //add list to group
        grupo.appendChild(lista)
    })
     
    resumen.appendChild(mesa)
    resumen.appendChild(hora)
    resumen.appendChild(heading)
    resumen.appendChild(grupo)

    contenido.appendChild(resumen)
}

function limpiarHTML(){
    const contenido = document.querySelector('#resumen .contenido')
    while(contenido.firstChild)
    {
        contenido.removeChild(contenido.firstChild)
    }
}
function calcularSubtotal( precio,cantidad)
{
    return `$ ${precio*cantidad}`

}