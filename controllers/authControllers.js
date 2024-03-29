const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db.js')

const {promisify} = require('util')
const { error } = require('console')

//const { error } = require('console')
//const { error } = require('console')

////procedimiento para registrarmos

exports.register = async(req,res)=>{
    try {
        const nombre = req.body.name
        const user = req.body.user
        const pass = req.body.pass
       let passHash=  await  bcryptjs.hash(pass,8)
       //
       conexion.query('INSERT INTO usuarios1 SET ?',{user:user,nombre:nombre,pass:passHash},(error,results) =>{
         if(error){console.log(error)}
         res.redirect('/')
        
       })
        
    } catch (error) {
        console.log(error)
    }


}
exports.login = async(req,res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass

        if(!user|| !pass){
            res.render('login',{
                alert:true,
                alertTitle:"advertencia",
                alertMessage:"ingrese un usuario y contraseña",
                alertIcon:'info',
                showConfirmButton:true,
                timer:2000,
                ruta:'login'
            })

        }else{
            conexion.query('SELECT * FROM usuarios1 WHERE user = ?',[user], async(error,results) => {
                if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login',{
                        alert:true,
                        alertTitle:"Error",
                        alertMessage:"usuario y contraseña incorrecta",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer:2000,
                        ruta:'login'
                    })  
                }else{

                   const id = results[0].id
                   /*const token = jwt.sign({id: id},process.env.JWT_SECRETO,{
                    expiresIn:process.env.JWT_TIEMPO_EXPIRA
                   })*/
                   //token sin fecha de expiraxion
                   const token = jwt.sign({id: id},process.env.JWT_SECRETO)

                   console.log("TOKEN: "+token+" para el USUARIO: "+user)

                   const cookiesOptions ={
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly:true
                   }
                   res.cookie('jwt',token,cookiesOptions)
                   res.render('login',{
                    alert:true,
                    alertTitle:"Conexion exitosa",
                    alertMessage:"usuario y contraseña correcta",
                    alertIcon:'success',
                    showConfirmButton:false,
                    timer:2000,
                    ruta:''

                   })
                }
               
            })
        }
        
    } catch (error) {
        console.log(error)
    }

}
exports.isAuthenticated = async(req,res,next) =>{
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM WHERE id = ?' ,[decodificada.id],(error ,results)=>{
                if (!results){return next ()}
                req.user = results[0]
                return next()
                
            })
        } catch (error) {
            console.log(error)
            return next()
            
        }

    }else{
        res.redirect('/login')
        
    }
}

exports.logout = (req,res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')

}