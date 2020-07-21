const mongoose =  require("mongoose")
const Schema  =  mongoose.Schema;


const docSchema =  new Schema({
     name:{
          type:String,
          unique:true
     }, 
     description:{
         type:String,
         maxlength:[50,'please dont go over 50 charachters'
        ]
     },
     owner:{
         type: Schema.ObjectId,
         ref:'users'
     },
     location:{
          type:String
     }, 
     subPath:{
           type:String
     },
     createdAt:{
           type:Date,
           default: new Date().now

     }
});



module.exports =  mongoose.model('docs',docSchema)