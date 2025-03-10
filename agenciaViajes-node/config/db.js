import sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({path:'.env'})
const db = new sequelize(process.env.DB_NAME,process.env.DB_USER,'' ?? '',{
    host:process.env.DB_HOST,
    port:3306,
    dialect:'mysql',
    define:{
        timestamps:'false',
        
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorsAliases:false
});

export default db