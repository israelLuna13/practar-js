const url = "http://localhost:4000/clientes";

export const newCustomer = async (customer) => {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
};

export const getCustomers = async () => {
  try {
    const result = await fetch(url);
    const customer = await result.json();
    return customer;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCustomer = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerById = async (id) => {
  try {
    const result = await fetch(`${url}/${id}`);
    const customer = await result.json();
    return customer;
  } catch (error) {
    console.log(error);
  }
};

export const updateCUstomer = async (customer) => {
  try {
    await fetch(`${url}/${customer.id}`, {
      method: "PUT",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "applicacion/json",
      },
    });
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
};
