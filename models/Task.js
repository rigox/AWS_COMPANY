const mongoose =  require("mongoose");
const Schema = mongoose.Schema;


const taskSchema = new Schema({
     name:{
          type:String,
          unique:true
     },
     description:{
          type:String,
          description:[50,'limit 50 charcters']
     },
     user:{
          type: Schema.ObjectId,
          ref:'users'     
     },
     completed: { 
           type:Boolean,
           default:false
     },
     createdAt:{
          type:Date,
          default: new Date().now
     }
});



module.exports = mongoose.model('tasks',taskSchema)