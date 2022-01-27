
const employeeData=require('../db/employeeSchema');

async function getData(){
    await employeeData.find({},(err,data)=>{
        if(err) throw err;
        return data;
    })
}

async function postData(data){
    let ins=await new employeeData(data)
    ins.save((err)=>{
        if (err) throw err
    })
}

async function deleteData(ename){
    await employeeData.deleteOne({ename:ename},(err)=>{
        if (err) throw err;
    })
}

async function updateData(ename,data){
    await employeeData.updateMany({ename:ename},{$set :{ename:data.ename,email:data.email,eage:data.eage,ecity:data.ecity}},(err)=>{
        if (err) throw err;
    })
}

module.exports = {getData,postData,updateData,deleteData}
