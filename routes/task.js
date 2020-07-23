const express =  require("express")

const {createTask} =  require("../controllers/Task")

const router =  express.Router()

router.
     route('/')
        .post(createTask)

module.exports  =   router;