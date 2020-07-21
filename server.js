const express = require("express")
const dotenv =  require("dotenv")
const colors =  require("colors")
const cors =  require("cors")
const morgan  =  require('morgan')
const fileUploader =   require("express-fileupload")
const errHandler = require("./middleware/error")
const db =  require("./config/db")
const app  = express()


//load enviromental variables
dotenv.config({path:'./config/config.env'})


//Load database
db();


//add file middleware to the app
app.use(fileUploader())

//load routes 
const users =  require("./routes/user")
const docs =  require("./routes/docs")
//setup middleware
app.use(express.urlencoded())
app.use(express.json())

//enable cors
app.use(cors())


//Add routes
app.use('/api/v1/users',users);
app.use('/api/v1/docs', docs);

//set up error handler
app.use(errHandler)

if(process.env.ENV === 'development'){
      app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000;

const server =  app.listen(PORT ,  ()=>{
    console.log(`listening on port ${PORT}`.yellow)
});

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`.red.bold);
    //close server and exit process
    server.close(()=>{process.exit(1)});
});



