
const express =  require("express")

const {createUser}   =  require("../controllers/user")


const   Router = express.Router()


Router.
    route('/')
        .post(createUser)


module.exports =   Router;