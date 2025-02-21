import {Viaje} from '../models/Viaje.js'
export const pageHome = (req,res)=>{
    res.render('inicio',{
        pagina:'Inicio'
    })
}

export const pageUs = (req,res)=>{
    res.render('nosotros',{
        pagina:'Nosotros'
    })
}

export const pageTravels = async(req,res)=>{
    //query to database
    const travels = await Viaje.findAll() 

    res.render('viajes',{
        page:'Next travels',
        travels
    })
}

export const pageTestimonials= (req,res)=>{
    res.render('testimoniales',{
        page:'Testimoniales'
    })
}

//show travel by id
export const pageDetailTravel = async(req,res)=>{
    const {id} = req.params 
    try {

        const travel = await Viaje.findOne({where:{slug:id}})
        if(!travel){

            console.log('There is not information about these travel');
            return           
        }

        res.render('travel',{
            page:'About travel',
            travel
        })

    } catch (error) {
        console.log(error);
    }
    
}