const express = require("express")
const { signup, signin, signout , getAllUsers,task , pagination } = require("../controllers/user")
const {check} = require('express-validator')
const router = express.Router()

router.post('/signup', [
  check("name", "Name atleast should be 3 characters").isLength({min: 3}),
  check("email", "Email should be valid").isEmail(),
  check("password", "Password at least should be 6 characters").isLength({min: 6}),
] ,signup)

router.post('/signin', signin)

router.get("/signout", signout)

router.get("/users", getAllUsers)

router.post("/task", task)

router.get("/pagination", pagination)

module.exports = router