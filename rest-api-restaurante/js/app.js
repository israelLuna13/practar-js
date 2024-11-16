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

    if(cliente.pedido.length)
    {
            //show order
        actualizarResumen()

    }else{
        mensahePedidoVacio
    }


}

function actualizarResumen(){
    const contenido = document.querySelector('#resumen .contenido')

    const resumen = document.createElement('div')
    resumen.classList.add('col-md-6','card','py-3','px-3','shadow')
    //table
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

          //btn delete
          const btnEliminar = document.createElement('button')
          btnEliminar.classList.add('btn','btn-danger')
          btnEliminar.textContent  = 'Eliminar pedido'

          //function delete order
          btnEliminar.onclick = function(){
            eliminarPedido(id)
          }

        //add value a her containers
        cantidadEle.appendChild(cantidadValor)
        precioEle.appendChild(precioValor)
        subtotalEl.appendChild(subTotalValor)


        //add elemt to LI
        lista.appendChild(nombreEl)
        lista.appendChild(cantidadEle)
        lista.appendChild(precioEle)
        lista.appendChild(subtotalEl)
        lista.appendChild(btnEliminar)

        //add list to group
        grupo.appendChild(lista)
    })
     
    resumen.appendChild(heading)
    resumen.appendChild(mesa)
    resumen.appendChild(hora)
    resumen.appendChild(grupo)

    contenido.appendChild(resumen)

    //show form 
    formularioPropinas()
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

function eliminarPedido(id)
{
    const {pedido} =cliente
    const resultado = pedido.filter( elem => elem.id !== id)
    cliente.pedido=[...resultado]   
    limpiarHTML()

    if(cliente.pedido.length)
        actualizarResumen()
    else
        mensahePedidoVacio()
        

        //product has been deleted 
        const productoEliminado = `#producto-${id}`
        const inputEliminado = document.querySelector(productoEliminado)

        inputEliminado.value = 0         
}
function mensahePedidoVacio(){
    const contenido = document.querySelector('#resumen .contenido')

    const texto = document.createElement('p')
    texto.classList.add('text-center')
    texto.textContent='Añade los productos del pedido'

    contenido.appendChild(texto)
}
function formularioPropinas(){

    const contenido = document.querySelector('#resumen .contenido')
    const formulario= document.createElement('div')
    formulario.classList.add('col-md-6' , 'formulario')

    const divFormulario = document.createElement('div')
    divFormulario.classList.add('card','py-2','px-3','shadow')

    const heading = document.createElement('h3')
    heading.classList.add('my-4','text-center')
    heading.textContent = 'Propina'

    //button radio 10%
    const radio10 = document.createElement('input')
    radio10.type='radio'
    radio10.name = 'propina'
    radio10.value= '10'
    radio10.classList.add('form-check-input')
    radio10.onclick=calcularPropina

    const radio10Label = document.createElement('label')
    radio10Label.textContent = '10%'
    radio10Label.classList.add('form-check-label')

    const radio10Div =document.createElement('div')
    radio10Div.classList.add('form-check')

    radio10Div.appendChild(radio10)
    radio10Div.appendChild(radio10Label)

      //button radio 25%
      const radio25 = document.createElement('input')
      radio25.type='radio'
      radio25.name = 'propina'
      radio25.value= '25'
      radio25.classList.add('form-check-input')
      radio25.onclick=calcularPropina

  
      const radio25Label = document.createElement('label')
      radio25Label.textContent = '25%'
      radio25Label.classList.add('form-check-label')
  
      const radio25Div =document.createElement('div')
      radio25Div.classList.add('form-check')
  
  
      radio25Div.appendChild(radio25)
      radio25Div.appendChild(radio25Label)


          //button radio 50%
          const radio50 = document.createElement('input')
          radio50.type='radio'
          radio50.name = 'propina'
          radio50.value= '50'
          radio50.classList.add('form-check-input')
          radio50.onclick=calcularPropina

      
          const radio50Label = document.createElement('label')
          radio50Label.textContent = '50%'
          radio50Label.classList.add('form-check-label')
      
          const radio50Div =document.createElement('div')
          radio50Div.classList.add('form-check')
      
      
          radio50Div.appendChild(radio50)
          radio50Div.appendChild(radio50Label)

    //add to div
    divFormulario.appendChild(heading)

    //add to form
    divFormulario.appendChild(heading)
    divFormulario.appendChild(radio10Div)
    divFormulario.appendChild(radio25Div)
    divFormulario.appendChild(radio50Div)
    formulario.appendChild(divFormulario)
    contenido.appendChild(formulario)
    
}

function calcularPropina(){

    const {pedido} = cliente
    let subtotal = 0

    //calculate subtotal
    pedido.forEach(articulo =>{
        subtotal += articulo.cantidad * articulo.precio
    })

    //radio button selected
    const propinaSeleccionada = document.querySelector('[name="propina"]:checked').value

    //calculate tip
    const propina = ((subtotal * parseInt(propinaSeleccionada))/100)
    console.log(propina);

    //calculate total 
    const total = subtotal + propina

    mostrarTotalHTML(subtotal,total,propina)
}

function  mostrarTotalHTML(subtotal,total,propina){

    const divTotales = document.createElement('div')
    divTotales.classList.add('total-pagar','my-5')

    //subtotal
    const subtotalParrafo = document.createElement('p')
    subtotalParrafo.classList.add('fs-4','fw-bold','mt-2')
    subtotalParrafo.textContent = 'Subtotal Consumo: '

    const subtotalSpan = document.createElement('span')
    subtotalSpan.classList.add('fw-normal')
    subtotalSpan.textContent = `$${subtotal}`

    subtotalParrafo.appendChild(subtotalSpan)

     //tip
      const propinaParrafo = document.createElement('p')
      propinaParrafo.classList.add('fs-4','fw-bold','mt-2')
      propinaParrafo.textContent = 'Propina: '
  
      const propinaSpan = document.createElement('span')
      propinaSpan.classList.add('fw-normal')
      propinaSpan.textContent = `$${propina}`
  
      propinaParrafo.appendChild(propinaSpan)

      //total
      const totalParrafo = document.createElement('p')
      totalParrafo.classList.add('fs-4','fw-bold','mt-2')
      totalParrafo.textContent = 'Total: '
  
      const totalSpan = document.createElement('span')
      totalSpan.classList.add('fw-normal')
      totalSpan.textContent = `$${total}`
  
      totalParrafo.appendChild(totalSpan)

      //delete the last result
      const totalPagarDiv = document.querySelector('.total-pagar')
      if(totalPagarDiv){
        totalPagarDiv.remove()
      }

  
    divTotales.appendChild(subtotalParrafo)
    divTotales.appendChild(propinaParrafo)
    divTotales.appendChild(totalParrafo)

    //select first div
    const formulario = document.querySelector('.formulario > div')
    formulario.appendChild(divTotales)
}
