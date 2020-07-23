const express =  require("express")

const {login ,logout}  = require("../controllers/auth")
const {protect}   =  require("../middleware/auth")
const router =  express.Router()

router.
    route('/login')
        .post(login)
    
router.
    route('/logout')
        .get(protect,logout)
        


module.exports  =  router;
