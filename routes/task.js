const express =  require("express")

const {createTask , completeTask , getTasks} =  require("../controllers/Task")

const router =  express.Router()

router.
     route('/')
        .post(createTask)
        .get(getTasks)

router.
      route('/complete/:id')
        .delete(completeTask)
        
module.exports  =   router;