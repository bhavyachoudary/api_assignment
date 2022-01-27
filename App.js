const express=require('express');

const port =9999;
const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const connectDB=require('./config/db')
connectDB()

const router=require('./routes/employeeRoutes')
app.use('/emp',router)


app.listen(port,(err)=>{
    if(err) throw err
    console.log(`Work on ${port}`)
})