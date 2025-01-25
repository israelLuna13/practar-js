import { getCustomers,deleteCustomer } from "./API.js";

(function(){

    document.addEventListener('DOMContentLoaded',showCustomers)

    const list = document.querySelector('#listado-clientes')
    list.addEventListener('click',Delete)

    

   async function showCustomers() {

     const customer = await getCustomers();

     customer.forEach((element) => {
       const { email, phone, id, name, company } = element;

       const row = document.createElement("tr");

       row.innerHTML += `
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${phone}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
            <p class="text-gray-600">${company}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
        </td>
    `;
       list.appendChild(row);
     });
   }

    function Delete(e) {
      if (e.target.classList.contains("eliminar")) {
        const custimerId = e.target.dataset.cliente;
        const confirmar = confirm("Do you wish delete this customer?");
        if (confirmar) {
          deleteCustomer(custimerId);
        }
      }
    }

})()