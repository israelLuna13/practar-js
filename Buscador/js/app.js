//variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
//contenedor para los resultado
const resultado = document.querySelector("#resultado");
//fecha
const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con las busqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
  llenarSelect();
});

//------------------------------------------------------------------event listener para los select de busqueda---------------------------------------
//when the select change will excecute the function filtrarAuto
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto()
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value)
  filtrarAuto()
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto()
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto()
});

puertas.addEventListener("change", (e) => {
    datosBusqueda.puertas =parseInt( e.target.value)
    filtrarAuto()
  });

  transmision.addEventListener("change", (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto()
  });

  color.addEventListener("change", (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto()
  });

  //------------------------------------------------------------------Functions---------------------------------------
function mostrarAutos(autos) {
  //delete html previous
  limpiarHtml()
  autos.forEach((auto) => {
    const autoHTML = document.createElement("p");
    const { marca, modelo, year, puertas, transmision, precio } = auto;
    autoHTML.textContent = `
                ${marca}  ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio:${precio} - Color:${color}
            `;
    //inyect the html created
    resultado.appendChild(autoHTML);
  });
}

function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); // put opcions into select
  }
}

//clear html
function limpiarHtml(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild)
  }
}

//filter based on search
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
  console.log(resultado);
    if(resultado.length){
      mostrarAutos(resultado)
    }else{
      noResultados()
    }
}

//function to show alert when not one results
function noResultados(){
  limpiarHtml()
  const noResultado = document.createElement('div')
  noResultado.classList.add('alerta','error')
  noResultado.textContent = 'No hay Resultados'
  resultado.appendChild(noResultado)
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda
    if(marca){
        return auto.marca === marca
    }
    return auto
}

function filtrarYear(auto){
  const {year} = datosBusqueda

  if(year){
      return auto.year === year
  }
  return auto
}

function filtrarMinimo(auto){
  const {minimo} = datosBusqueda

  if(minimo){
      return auto.precio >= minimo
  }
  return auto
}
function filtrarMaximo(auto){

  const {maximo} = datosBusqueda

  if(maximo){
      return auto.precio <= maximo
  }
  return auto
}

function filtrarPuertas(auto){
  const {puertas} = datosBusqueda

  if(puertas){
      return auto.puertas === puertas
  }
  return auto
}

function filtrarTransmision(auto){
  const {transmision} = datosBusqueda

  if(transmision){
      return auto.transmision === transmision
  }
  return auto
}

function filtrarColor(auto){
  const {color} = datosBusqueda

  if(color){
      return auto.color === color
  }
  return auto
}