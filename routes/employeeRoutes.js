const {getData,postData,updateData,deleteData}=require('../controller/employeeController');
const express=require('express');
const router =express.Router();
const { check, validationResult } = require('express-validator')
const jwt = require("jsonwebtoken");
const jwtSecret = "wewr32vsdfgswfwr2343ert";

const employeeData=require('../db/employeeSchema');

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Token Matched")
                next();
            }
        })
    }
}

router.get("/getdata",(req,res)=>{
    res.send(getData());
})

router.post("/login", [check('ename').isLength({ min: 3 }), check('email').isEmail()], 
(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let ename = req.body.ename;
    let email = req.body.email;

    employeeData.findOne({ ename: ename, email: email }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "name is not correct" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "name is not correct" })
        }
        else {
            let payload = {
                uid: ename
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.json({ "err": 0, "msg": "Login Success", "token": token })
        }
    })
})



router.post("/postdata",autenticateToken,
    [
        check('ename', 'Name should contains atleast 3 characters').exists().isLength({ min: 3,max:12 }),
        check('eage','age should be in numeric').isNumeric(),
        check('email', 'Email is not valid').isEmail().normalizeEmail(),
        check('ecity', 'City name shpuld be more tan 2 characters ').exists().isLength({ min: 3 }),
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

    postData(req.body)
    res.send("Data added")
})

router.put("/updatedata/:ename",(req,res)=>{
    updateData(req.params.ename,req.body)
    res.send("Data Updated ")
})

router.delete("/deletedata/:ename",(req,res)=>{
    deleteData(req.params.ename);
    res.send("Deleted data")
})

module.exports=router;