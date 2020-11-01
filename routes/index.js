const express = require('express')
const router = express.Router()

const User = require('../models/User');

const isLoggedIn = (req,res,next) =>{
  if(!req.user){
    res.redirect('/login')
  }
  next()
}
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { title: 'Voting' })
})
router.get('/register', (req, res) => { 
  res.render('register')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/logout',(req,res)=>{
  console.log("Logged out")
  req.user = null
  res.render('login')
})
module.exports = router
