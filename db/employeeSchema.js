const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
    ename:{type:String,required:true,unique:true},
    eage:{type:Number,required:true},
    email:{type:String,required:true},  
    ecity:{type:String,required:true}
    

})

module.exports=mongoose.model("employeeData",employeeSchema);