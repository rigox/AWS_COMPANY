const express =  require("express");
const router =  express.Router()

const {uploadDocument}  =  require("../controllers/docs")

router.
    route('/')
        .post(uploadDocument)


module.exports =   router;
