import { getCustomerById, updateCUstomer } from "./API.js";
import { showAlert, checkInput } from "./funciones.js";
(function () {
  const nameInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#telefono");
  const companyInput = document.querySelector("#empresa");
  const idInput = document.querySelector("#id");

  document.addEventListener("DOMContentLoaded", async () => {

    const parametrosURL = new URLSearchParams(window.location.search);// we get the url
    const idCustomer = parametrosURL.get("id");// we get the params url
    const customer = await getCustomerById(idCustomer);
    showCustomer(customer);

    const form = document.querySelector("#formulario");
    form.addEventListener("submit", checkCustomer);
  });

  function showCustomer(customer) {
    const { name, phone, email, company, id } = customer;
    nameInput.value = name;
    emailInput.value = email;
    companyInput.value = company;
    phoneInput.value = phone;
    idInput.value = id;
  }
  function checkCustomer(e) {
    e.preventDefault();

    const customer = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      company: companyInput.value,
      id: idInput.value,
    };
    // every check each elemt of object with the same condition
    if (!checkInput(customer)) {
      showAlert("All input are required");
      return;
    }
    //rewrite object
    updateCUstomer(customer);
  }
})();
