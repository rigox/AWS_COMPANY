const express =  require("express")

const {createTask , completeTask , getTasks} =  require("../controllers/Task")

const {protect} =   require("../middleware/auth")

const router =  express.Router()

router.
     route('/')
        .post(protect,createTask)
        .get(protect,getTasks)

router.
      route('/complete/:id')
        .delete(protect,completeTask)
        
module.exports  =   router;