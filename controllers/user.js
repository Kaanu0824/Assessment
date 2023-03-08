const User = require("../models/user")
const user = require("../models/user")
var expressJwt = require('express-jwt')
var jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')


exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg
    })
  }

  const user = new User(req.body)
  user.save((err, user) => {
    if(err) {
      return res.status(400).json({
        error: "Unable to add user"
      })
    }

    return res.json({
      message: "Success",
      user
    })
  })
}



exports.signin = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email was not found"
      })
    }

    // AUTHENTICATE USER  
    if(!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match"
      })
    }

    // CREATE TOKEN 
    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    // PUT TOKEN IN COOKIE 
    res.cookie('token', token, {expire: new Date() + 1})

    // SEND RESPONSE 
    const {_id, name, email} = user
    return res.json({
        message: "User signIn sucessfully"
    
    })
    
  })
}


exports.signout = (req, res) => {
  res.clearCookie("token")
  return res.json({
    message: "User siginout successful"
  })
}