
const asyncHandler =  require("../middleware/async")
const errorResponse =  require("../utils/errorResponse")
const  User =  require("../models/User");

//@Desc  logins a user
//@Route POST  /api/v1/auth/
//@Access  public
exports.login =   asyncHandler(async(req,res,next)=>{
    
});