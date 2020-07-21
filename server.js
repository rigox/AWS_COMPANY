const express = require("express")
const dotenv =  require("dotenv")
const colors =  require("colors")
const cors =  require("cors")
const morgan  =  require('morgan')
const errHandler = require("./middleware/error")
const db =  require("./config/db")
const app  = express()


//load enviromental variables
dotenv.config({path:'./config/config.env'})


//Load database
db();


//load routes 
const users =  require("./routes/user")

//setup middleware
app.use(express.urlencoded())
app.use(express.json())

//enable cors
app.use(cors())


//Add routes
app.use('/api/v1/users',users);


//set up error handler
app.use(errHandler)

if(process.env.ENV === 'development'){
      app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000;

const server =  app.listen(PORT ,  ()=>{
    console.log(`listening on port ${PORT}`.yellow)
});





