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

taskSchema.methods.isAssigned =   function(id){
     let  temp =  this.user
     temp =  temp.toString()
     if(id.toString()  === temp){
          return true;
     }
      else{
           return false
      }
 }

module.exports = mongoose.model('tasks',taskSchema)