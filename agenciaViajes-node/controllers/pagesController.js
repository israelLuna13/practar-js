import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";
export const pageHome = async (req, res) => {
  const promiseDB = [];
  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));

  try {
    //execute two query to have best performance
    const result = await Promise.all(promiseDB);
    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      travels: result[0],
      testimoniales: result[1],
    });
  } catch (error) {
    console.log(error);
  }
};

export const pageUs = (req, res) => {
  res.render("nosotros", {
    page: "Nosotros",
  });
};

export const pageTravels = async (req, res) => {
  //query to database
  const travels = await Viaje.findAll();

  res.render("viajes", {
    page: "Next travels",
    travels,
  });
};

export const pageTestimonials = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();
    
    // if (condition) {

    // }
    res.render("testimoniales", {
      page: "Testimoniales",
      testimoniales
        });
  } catch (error) {
    console.log(error);
  }
};

//show travel by id
export const pageDetailTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const travel = await Viaje.findOne({ where: { slug: id } });
    if (!travel) {
      console.log("There is not information about these travel");
      return;
    }
    res.render("travel", {
      page: "About travel",
      travel,
    });
  } catch (error) {
    console.log(error);
  }
};
