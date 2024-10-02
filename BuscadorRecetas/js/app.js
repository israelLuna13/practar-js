function iniciarApp(){
    const selectCategorias = document.querySelector('#categorias')    
    const resultado = document.querySelector('#resultado')
    const favDiv = document.querySelector('.favoritos')

    var modal = new bootstrap.Modal('#modal',{})


    if(selectCategorias){
        selectCategorias.addEventListener('change',seleccionarCategoria)
        obtenerCategorias()
    }
    if(favDiv){
        obtenerFav()
    }

    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
            .then(respuesta =>respuesta.json())
            .then(resultado=>mostrarCategorias(resultado.categories))
    }

    function mostrarCategorias(categorias=[]){

        categorias.forEach(categoria =>{
            const {strCategory} = categoria
            const option = document.createElement('option')
            option.value=strCategory
            option.textContent=strCategory
            selectCategorias.appendChild(option)
        })
    }
    function seleccionarCategoria(e){
        const categoria=e.target.value
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetas(resultado.meals)           )
                
    }

    function mostrarRecetas(recetas=[])
    {
        limpiarHTML(resultado)

        const heading = document.createElement('h2')
        heading.classList.add('text-center','text-black','my-5')
        heading.textContent = recetas.length ? 'Resultados':'No hay resultados'
        resultado.appendChild(heading)
        //iterar en los resultados
        recetas.forEach(receta =>{
            const {idMeal,strMeal,strMealThumb} =receta            
            const recetaContenedor=document.createElement('DIV')
            recetaContenedor.classList.add('col-md-4')
            const recetaCard=document.createElement('DIV')
            recetaCard.classList.add('card','mb-4')

            const recetaImagen = document.createElement('IMG')
            recetaImagen.classList.add('card-img-top')
            recetaImagen.alt=`Imagen de la receta ${strMeal ?? receta.titulo}`
            recetaImagen.src=strMealThumb ?? receta.img

            const recetaCardBody=document.createElement('DIV')
            recetaCardBody.classList.add('card-body')

            const recetaHeading = document.createElement('H3')
            recetaHeading.classList.add('card-title','mb-3')
            recetaHeading.textContent = strMeal ?? receta.titulo

            const recetaButton=document.createElement('button')
            recetaButton.classList.add('btn','btn-danger','w-100')
            recetaButton.textContent='Ver receta'
            // recetaButton.dataset.bdTarget='#modal'
            // recetaButton.dataset.bsToggle='modal'

            recetaButton.onclick = function(){
                seleccionarReceta(idMeal ?? receta.id)
            }

            //inyectar en el codigo html

            recetaCardBody.appendChild(recetaHeading)
            recetaCardBody.appendChild(recetaButton)
            recetaCard.appendChild(recetaImagen)
            recetaCard.appendChild(recetaCardBody)

            
            recetaContenedor.appendChild(recetaCard)
            resultado.appendChild(recetaContenedor)
        })
    }

    function seleccionarReceta(id){
        const url =`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0])
            )        
    }

    function mostrarRecetaModal(receta){
        const {idMeal,strInstructions,strMeal,strMealThumb}=receta
        const modalTitle = document.querySelector('.modal .modal-title')
        const modalBody = document.querySelector('.modal .modal-body')

        modalTitle.textContent=strMeal
        modalBody.innerHTML=
                                `
                                    <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}"/>
                                    <h3 class="my-3">Instrucciones</h3>
                                    <p>${strInstructions}</p>
                                    <h3>Ingredientes y cantidades</h3>
                                `                                
         const listGroup=document.createElement('UL')
         listGroup.classList.add('list-group')
        //mostrar cantidades y ingredientes
        for(let i=1; i<=20; i++)
        {
            if(receta[`strIngredient${i}`]){
                const ingrediente=receta[`strIngredient${i}`]
                const cantidad = receta[`strMeasure${i}`]

                const ingredienteLi = document.createElement('LI')
                ingredienteLi.classList.add('list-group-item')
                ingredienteLi.textContent=`${ingrediente} -${cantidad}`
                listGroup.appendChild(ingredienteLi)
            }
        }
      

        modalBody.appendChild(listGroup)
        const modalFooter= document.querySelector('.modal-footer')
        limpiarHTML(modalFooter)

          //botones de cerrar y fav
          const btnFav= document.createElement('button')
          btnFav.classList.add('btn','btn-danger','col')
          btnFav.textContent= existeStorage(idMeal) ? 'Eliminar favorito':'Guardar favorito'

          //almacenar en localstorage
          btnFav.onclick=function()
          {
            if(existeStorage(idMeal))
            {
                eliminarFav(idMeal)
                btnFav.textContent='Guardar Favorito'
                mostrarToast('Eliminado correctament')
                return
            }
            
            agregarFav({
                id:idMeal,
                titulo:strMeal,
                img:strMealThumb
            })
            btnFav.textContent='Eliminar Favorito'
            mostrarToast('Agregado correctamente correctament')

          }

          const btnCerrar= document.createElement('button');
          btnCerrar.classList.add('btn','btn-secondary','col');
          btnCerrar.textContent='Cerrar';
         
          btnCerrar.onclick= function(){
            modal.hide();
          }

          modalFooter.appendChild(btnFav)
          modalFooter.appendChild(btnCerrar)
        //muestra el modal
        modal.show()

    }

    function agregarFav(receta){
        const favo= JSON.parse(localStorage.getItem('favoritos') )?? []
        localStorage.setItem('favoritos',JSON.stringify([...favo,receta]))
    }

    function eliminarFav(id){
        const favo= JSON.parse(localStorage.getItem('favoritos') )?? []
        const nuevosFavoritos = favo.filter(favo => favo.id != id)
        localStorage.setItem('favoritos',JSON.stringify(nuevosFavoritos))
    }


    function existeStorage(id){
        const favo= JSON.parse(localStorage.getItem('favoritos') )?? []
        return favo.some(favo => favo.id === id);

    }

    function mostrarToast(mensaje){
         const toastDiv = document.querySelector('#toast')
         const toastBody = document.querySelector('.toast-body')
         const toast = new bootstrap.Toast(toastDiv)
         toastBody.textContent=mensaje
         toast.show()
    }
    function obtenerFav(){
        const fav = JSON.parse(localStorage.getItem('favoritos'))??[]
        if(fav.length){
            mostrarRecetas(fav)
            return
        }
        const noFavo= document.createElement('p')
        noFavo.textContent='No hay favoritos aun'
        noFavo.classList.add('fs-4','text-center','font-bold','mt-5')
        favDiv.appendChild(noFavo)
        
    }
    function limpiarHTML(selector){
        while(selector.firstChild)
            selector.removeChild(selector.firstChild)
    }
}
document.addEventListener('DOMContentLoaded',iniciarApp)