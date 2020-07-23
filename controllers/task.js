const  Task  =  require("../models/Task")
const  asyncHandler =  require("../middleware/async")
const errorResponse =  require("../utils/errorResponse")
const aws =  require("aws-sdk")



aws.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey:process.env.SECRETACCESSKEY,
    region:'us-east-1'
})

//@Des creates a job an assigns it to a user
//@Router POST api/v1/task/
//@Access Private
exports.createTask =   asyncHandler(async(req,res,next)=>{
     const sqs =   new aws.SQS()
      


     const params = {
         MessageBody:JSON.stringify(req.body),
         QueueUrl:process.env.SQS_URL
     }

    
     sqs.sendMessage(params,(err,data)=>{
         if(err){
              throw err
         }else{
             res.status(200).json({success:true, data})
         }
     });

});