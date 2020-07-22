const jwt =  require("jsonwebtoken");
const errorResponse =  require("../utils/errorResponse")
const  asyHandler =   require("./async")
const  User =  require("../models/User")

//add authenticaton middleware to routes

exoports.protect = asyHandler(async(req,res,next)=>{
    
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token =  req.headers.authorization.split(' ')[1];
 
     }

   if(!token){
        return next(new errorResponse('not authorized to access this router',401))
   }  
  
  try {
      const decoded =  jwt.verify(token,process.env.JWT_SECRET)
      
      req.user =  await User.findById(decoded.id)

      next();

  } catch (err) {
     console.log(err);
    throw err;
  }  
    
});