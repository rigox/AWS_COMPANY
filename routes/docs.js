const express =  require("express");
const router =  express.Router()

const  {protect}  =  require("../middleware/auth")

const {uploadDocument,
        getFileInfo,
        deleteFile,
        getFiles
}  =  require("../controllers/docs")

router.
    route('/')
        .post(uploadDocument)
        .get(getFiles)

router.
     route('/:id')
          .get(getFileInfo)
          .delete(protect ,deleteFile)

module.exports =   router;
