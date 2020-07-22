
const asyncHandler =  require("../middleware/async")
const errorResponse =  require("../utils/errorResponse")
const  User =  require("../models/User");

//@Desc  logins a user
//@Route POST  /api/v1/auth/
//@Access  public
exports.login =   asyncHandler(async(req,res,next)=>{
    const {email,password}  =  req.body;

    if(!email || !password ){
         return next(new errorResponse('please provide email and password',400));
    }

    //check for the user

    const user =  await User.findOne({email:email}).select('+password');
    
    if(!user){
       return next(new errorResponse("invalid credentials",401)); 
    }

   //check if the passwords match
   
   const isMatch = await user.matchPassword(password)
   
   if(!isMatch){
       return next(new errorResponse("invalid credentials",401))
   }


   sendTokenResponse(user,200,res);


});


const sendTokenResponse = (user,statudCode,res) =>{
    //create token 
    const token =  user.signJwt();

    const options = {
        xpires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE *24 *60 *60*1000),
        httpOnly:true
    }

   if(process.env.NODE_ENV ==="production"){
       options.secure =  now
   }

   res
    .status(statudCode)
        .cookie('token',token,options)
        .json({sucess:true, token})
        
}