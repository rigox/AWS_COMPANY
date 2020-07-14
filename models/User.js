const moongose =  require("mongoose")
const bcrypt =  require("bcryptjs")
const jwt =  require("jsonwebtoken")
const Schema =  moongose.Schema



const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'please add a name']
   },
   email: {
      type: String,
      required:[true,'please add and email'],
      unique:true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    role:{
         type:String,
         enum:['user','publisher'],
         default:'user'
    },
    password:{
         type:String,
         required:[true,'please add a password'],
         maxlength:[6,'pass word should be 6 charachter long'],
         select:false
    },
    resetPasswordToke:String,
    resetPasswordExpire:Date,
    createdAt:{
         type:Date,
         default:Date.now()
    }
})


//encrypt the users password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
   }
   const salt =  await  bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password ,  salt);
});

//signed and get jwt token
userSchema.methods.signJwt = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}


//match password
userSchema.methods.matchPassword = async function(enterPass){
    return await bcrypt.compare(enterPass,this.password)
}

module.exports =  moongose.model('users',userSchema)