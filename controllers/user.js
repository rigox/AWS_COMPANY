const User =  require("../models/User")
const asyncHandler = require("../middleware/async")

//@Desc  creates a user profile
//@Route POST /api/v1/users
//@Access Public
exports.createUser = asyncHandler(async(req,res,next)=>{
      const user =  await User.create(req.body)
      
      res.status(200).json({success:true,data:user})
      
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

