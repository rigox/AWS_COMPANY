const asynHandler =   require("../middleware/async")
const errorResponse =  require("../utils/errorResponse")
const path =   require("path")
const aws  =   require("aws-sdk")
const Doc  =  require("../models/Docs")

aws.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey:process.env.SECRETACCESSKEY
})
//@Desc uploads a user document to the companies Bucket
//@Route POST  /api/v1/docs/
//@Access  private
exports.uploadDocument  =  asynHandler(async(req,res,next)=>{
      
     const  S3 =  new aws.S3()
     
     const file =  req.files.file
      
      let  subpath =  req.body.name.replace(/\s/g,'')
      subpath =  subpath.toLowerCase();
      let file_name = `docs/${subpath}${path.parse(file.name).ext}`
      
      let file_path = '';

      const params = {
        Bucket:process.env.BUCKET_NAME,
        Key: file_name, 
        Body:  file.data,
        ACL:'public-read',
        ContentType:file.mimetype
      }
      
      S3.putObject(params ,async(err,data)=>{
           if(err){
                throw err; 
           }
          file_path = `${process.env.BUCKET_URI}${file_name}`
          req.body.location =   file_path;
          req.body.subPath =  file_name;
          
          const document  =  await Doc.create(req.body);

          res.status(201).json({success:true, data: document})

      });
    
});


//@Desc deletes a file but only the owner can delete it
//@Route DELETE  /api/v1/docs/{id}
//@Access  private
exports.deleteFile =  asynHandler(async(req,res,next)=>{
       
     const file =  await Doc.findById(req.params.id);

    //check if file exist 
     if(!file){
       return  next(new errorResponse(`Document with the id of ${req.params.id} was not found`,400))
     }

  //makes sure only the owner can delete the file

   const owner = await  file.isOwner(req.user.id)
      
   if(!owner){
    return  next(new errorResponse('you are not the owner  fo the file',401))
   }

   //proced to delete file

   let deletedFile =  await file.remove();

   res.status(200).json({success:true,data:deletedFile})
     
});