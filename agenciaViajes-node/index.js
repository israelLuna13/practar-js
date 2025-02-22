import express from 'express';
import colors from 'colors'
import router from './routes/router.js';
import db from './config/db.js';

const app = express()

//connect to database
db.authenticate()
    .then(()=> console.log(colors.black.bgGreen(`Database's working`)))
    .catch(eror => console.log(colors.black.bgRed(eror))
    )
//it enables files public
app.use(express.static('public'))

//enable pug
app.set('view engine','pug')

//get current year
app.use((req,res,next)=>{
    const year = new Date()
    res.locals.CurrentYear=year.getFullYear()
    res.locals.nameSite='Agrencia de Viajes'
    next()
})

//enable body parser for to read data of forms
app.use(express.urlencoded({extended:true}))

//port
const port = process.env.PORT || 4000

//enable routes
app.use('/',router)

//enable server
app.listen(port,()=>{
    console.log(colors.black.bgCyan(`The server is working on port ${port}`));
    
})