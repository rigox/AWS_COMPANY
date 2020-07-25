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
      
     req.body.user =  req.user.id
     const task =  await  Task.create(req.body)
     
     sqs.sendMessage(params,(err,data)=>{
         if(err){
              throw err
         }else{

             res.status(200).json({success:true, data:task})
         }
     });


});

//@Des user marks task as complete
//@Router POST api/v1/task/complete/{id}
//@Access Private
exports.completeTask  =  asyncHandler(async(req,res,next)=>{
    //look for  task 
    const sqs =  new aws.SQS()
     
    const {RCH} =  req.body

    const task =   await   Task.findById(req.params.id)

    if(!task){
         return next(new errorResponse(`not task with the id ${req.params.id} was found`),404)
    }

    const user =  task.user
  
    //check  if the person assigned is completing the task
    const isAssigned =  task.isAssigned(user)
    console.log('boolean')
    if(!isAssigned){
      return next(new errorResponse('you are not assigned to this taks',404))
    }

     const  params = {
        QueueUrl:process.env.SQS_URL,
        ReceiptHandle: RCH
        
    }   
       await Task.findByIdAndDelete(req.params.id)
    sqs.deleteMessage(params ,  function(err,data){
       if(err){
          return next(new errorResponse('error',404))
       }else{
            res.status(200).json({success:true,data})
       }
    });
});


 //@Desc  view  all the task in the queque
//@Route GET  /api/v1/tasks
//@Access Private      
exports.getTasks  =  asyncHandler(async(req,res,next)=>{
    const sqs =  new aws.SQS()

    const  params = {
        QueueUrl:process.env.SQS_URL,
    }

    sqs.receiveMessage(params, function(err,data){
         if(err){
            return next(new errorResponse("error"))
         }else{
            //const  results = JSON.stringify(data)
            res.status(200).json({success:true,data})
         }
    });

});