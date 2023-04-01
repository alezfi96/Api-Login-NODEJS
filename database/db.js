const  mysql = require('mysql2')


const conexion =mysql.createConnection({
host : process.env.DB_HOST,
user : process.env.DB_USER,
password : process.env.DB_PASS,
database : process.env.DB_DATABASE,
 
})

conexion.connect((error)=>{
    if(error){
        console.log('Error de conexion :'+error)
    }
    console.log('conectado a la base de datos MySQL')
})

module.exports = conexion