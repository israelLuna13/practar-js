//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []

//event Listeners
eventListeners();
function eventListeners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit',agregraTweet)
    
    //cuando el documento esta listo. ponemos los datos en el localstorage
    document.addEventListener('DOMContentLoaded',()=>{
        //
        tweets = JSON.parse(localStorage.getItem('tweets') || [])
        crearHTML()
    })
}

//funciones
function agregraTweet(e){
    e.preventDefault()
    //text area donde el usuario escribe 
    const tweet = document.querySelector('#tweet').value;
    //validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }
    //creamos un tipo de id para cada mensaje
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //añadir
    tweets = [...tweets,tweetObj]

    //una vez agregado vamos a crear el html
    crearHTML()

    //reiniciar el formulario cada vez que se agregue un tweet
    formulario.reset()

}

//mostrar mensaje de error
function mostrarError(error){
    const mjsError = document.createElement('p')
    mjsError.textContent = error
    mjsError.classList.add('error')

    //insertar en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mjsError)

    setTimeout(()=>{
        mjsError.remove()
    },1000)

}

//
function crearHTML(){
    limpiarHTML()
    if(tweets.length > 0){
        tweets.forEach( tweet =>{
            //agregrar un boton 
            const btn = document.createElement('a')
            btn.classList.add('borrar-tweet')
            btn.innerText='X'

            //añadir la funcion de eliminar
            btn.onclick=()=>{
                borrarTweet(tweet.id)
            }
            //crear html
            const li = document.createElement('li')

            //añadir el texto
            li.innerText = tweet.tweet

            //asignar el bootn
            li.appendChild(btn)

            //insertar en el html
            listaTweets.appendChild(li)
        })
    }
    sincronizarStorage();
}

//agrega los tweets actuales a localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id )
    crearHTML()
}

//limpiar html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}