const express = require('express')
const router = express.Router()

const aunthController = require('../controllers/authControllers.js')
//const conexion = require('../database/db.js')

//router para las vistas
router.get('/',aunthController.isAuthenticated,(req,res)=>{
   // conexion()
    res.render('index',{user:req.user})
})

router.get('/login',(req,res)=>{
    res.render('login',{alert:false})
})

router.get('/register',(req,res)=>{
    res.render('register')
})



//router para los metodos del controller
router.post('/register',aunthController.register)
router.post('/login',aunthController.login)
router.get('/logout',aunthController.logout)

module.exports = router
