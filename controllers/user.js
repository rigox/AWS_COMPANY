const User =  require("../models/User")
const asyncHandler = require("../middleware/async")

//@Desc  creates a user profile
//@Route POST /api/v1/users
//@Access Public
exports.createUser = asyncHandler(async(req,res,next)=>{
      const user =  await User.create(req.body)
      
      res.status(200).json({success:true,data:user})
      
    });



