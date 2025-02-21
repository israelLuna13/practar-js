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

    console.log(errores);
    
    
}