import {Testimonial} from '../models/Testimoniales.js'
export const saveTestimonial = async(req,res)=>{
    const {name,email,message} = req.body

    const errores = []

    if(name.trim() === '')
    {
        errores.push({message:'The name is empty'})
    }
    if(email.trim() === '')
    {
        errores.push({message:'The email is empty'})
    }
    if(message.trim() === '')
    {
        errores.push({message:'The message is empty'})
    }


   try {
    const testimoniales = await Testimonial.findAll()


    if(errores.length > 0)
    {
        res.render('testimoniales',{
            page:'Testimoniales',
            errores,
            name,
            email,
            message,
            testimoniales
        })
    }else{
        //saved in database
            await Testimonial.create(
                {
                    name,
                    email,
                    message
                }
            )
            res.redirect('/testimoniales')
            
    }    
   } catch (error) {
    console.log(error);
    
    
   }
}