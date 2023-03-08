const mongoose=require("mongoose")
const express = require("express")
const app = express()


const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();



//DB Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB Connected")
}).catch(()=>{
    console.log("Unable to connect DB")
})

//use parsing middlwware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//import the routes
const userRoutes = require("./routes/user")

//using routes
app.use('/api',userRoutes)


const port = process.env.PORT || 8000

//Starting a server
app.listen(port, () => {
    console.log(`App is running at ${port}`)
  })