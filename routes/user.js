
const express =  require("express")

const {createUser ,getUser, getUsers}   =  require("../controllers/user")


const   Router = express.Router()


Router.
    route('/')
        .post(createUser)
        .get(getUsers)

Router.
    route('/:id')
        .get(getUser)

module.exports =   Router;