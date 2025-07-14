//import mongoose
const mongoose=require("mongoose");

//defining task schema
const TaskSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        completed:{type:Boolean,default:false},
    }
);

//create and export the model:
module.exports=mongoose.model("Task",TaskSchema);



