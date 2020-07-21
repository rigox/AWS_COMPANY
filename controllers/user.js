const User =  require("../models/User")
const asyncHandler = require("../middleware/async")
const errorResponse =  require("../utils/errorResponse")
//@Desc  creates a user profile
//@Route POST /api/v1/users
//@Access Public
exports.createUser = asyncHandler(async(req,res,next)=>{
      const user =  await User.create(req.body)
      
      res.status(200).json({success:true,data:user})
      
    });




//@Desc  gets a user by id
//@Route get api/user/{id}
//@Access Public
exports.getUser = asyncHandler(async(req,res,next)=>{
    
      const user  =  await User.findById(req.params.id)

      if(!user){
         return next(new errorResponse(`user with the ID ${id} was not found`,404)) 
      }

      res.status(200).json({success:true,data:user})
});

//@Desc gets all users
//@Route  GET api/v1/users/
//@Access Public
exports.getUsers =  asyncHandler(async(req,res,next)=>{
      const users =   await  User.find({})

       res.status(200).json({success:true,length:users.length,data:users})

});

//Deletes a  user by id
//@Route Delete api/v1/users/{id}
//@Access Private
exports.deleteUser  =  asyncHandler(async(req,res,next)=>{
    // find the user
    let user  =  User.findOne(req.body.email)

    if(!user){

    }

    await user.remove()

    res.status(200).json({success:true,data:{}})
});

