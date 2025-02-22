import { Sequelize } from "sequelize";
import db from '../config/db.js'

export const Testimonial = db.define('testimoniales',{
    name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    message:{
        type:Sequelize.STRING
    }
},
{
    timestamps: false, // 👈 Deshabilita los timestamps
    tableName: "testimoniales", // 👈 Asegura que Sequelize use el nombre correcto de la tabla
  }
)