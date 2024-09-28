(function(){
    let DB;
    let idCliente
    const nombreInput=document.querySelector('#nombre')
    const emailInput=document.querySelector('#email')
    const empresaInput=document.querySelector('#empresa')
    const telefonoInput=document.querySelector('#telefono')
    const formulario = document.querySelector('#formulario')

    document.addEventListener('DOMContentLoaded',()=>{
    conectarDB()
    //actualiza el registro
    formulario.addEventListener('submit',actualizarCliente)

    //verificar el id de la url
    const parametrosURL = new URLSearchParams(window.location.search)
    idCliente = parametrosURL.get('id')

    //esperamos que se se haga bien la conexion
    if(idCliente)
        setTimeout(()=>{
            obtenerCliente(idCliente)

         },100)
})
    function actualizarCliente(e){
        e.preventDefault()
        if(nombreInput.value === '' ||emailInput.value === '' ||telefonoInput.value === '' ||empresaInput.value === '' )
        {
            imprimirAlerta('Todos los campos son obligatorios','error');
            return
        }
        const clienteActualizado ={
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente)
        }
        const transaction = DB.transaction(['crm'],'readwrite')
        const objectStore = transaction.objectStore('crm')
        objectStore.put(clienteActualizado)

        transaction.oncomplete=function(){
            imprimirAlerta('Editado correctamente');
            setTimeout(() => {
                window.location.href='index.html'
                
            }, 3000);
        }

        transaction.onerror=function(){
           imprimirAlerta('Hubo un error','error');
            
        }

    
}
    function obtenerCliente(id){
        const transaction=DB.transaction(['crm'],'readwrite')
        const objectStore= transaction.objectStore('crm')
        const cliente = objectStore.openCursor()
        cliente.onsuccess=function(e){
            const cursor = e.target.result;
            if(cursor){
                if(cursor.value.id === Number(id))
                    llenarFormulario(cursor.value)
                
                cursor.continue()//pasamos el sig registro
            }
        }
    }
    function llenarFormulario(datosCliente){
        const {nombre,email,telefono,empresa} = datosCliente;
        nombreInput.value = nombre
        emailInput.value = email
        telefonoInput.value = telefono
        empresaInput.value = empresa
        
    }
    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm',1)
        abrirConexion.onerror=function(){
            console.log('Hubo un error');
        }
        abrirConexion.onsuccess=function(){
            DB=abrirConexion.result;
        }
    }
})()