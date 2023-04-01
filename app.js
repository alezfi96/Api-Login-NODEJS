const express  = require('express')
const dotenv = require('dotenv')
const  cookieParse = require('cookie-parser')


const app = express()

///SETEAMOS EL MOTOR DE  PLANTILLAS
app.set('view engine','ejs')
///seteamos la carpeta public para archivos estaticos 
app.use(express.static('public'))

///PARA PROCESAR DATOS ENVIADOS DESDE FORMS

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//SETEAMOS LAS VARIABLES DE ENTORNO
dotenv.config({path:'./env/.env'})

//para poder trabajar las cookies
app.use(cookieParse())

//lammar al router
app.use('/',require('./routes/router.js'))
app.use(function(req, res, next){
    if(!req.user)
       res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next();   

});

app.listen(3000,()=>{
    console.log('servicio corriendo in http://localhost:3000')
})