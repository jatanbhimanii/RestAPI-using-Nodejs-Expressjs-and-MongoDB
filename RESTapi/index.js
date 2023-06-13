const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("./conn.js");
const student = require("./student_schema.js")
app.use(express.json())


//insert data
app.post("/students", (req,res) => {
    const user = new student(req.body)
    console.log(req.body);

    user.save();
    res.send("hello students");
})


// all data from given api
app.get("/students", async (req,res) => {
    try {
        const studentData = await student.find();
        res.send(studentData);
    } catch (error) {
        res.status(404).send(error);
    }
})

//getbyname or any parameter
app.get("/students/:name", async (req,res) => {
    try {
        const student_name = req.params.name;
        console.log(req.params.name);
        const student_details = await student.find({name : student_name});
        res.send(student_details);
    } catch (error) {
        res.send(error)
    }
})

//updatebyname or any parameter
app.patch("/students/:name" , async (req,res) => {
    try {
        const student_name = req.params.name;
        const updateStudentname = await student.updateMany({name:student_name},{$set : {
            name: req.body.name,
            email: req.body.email
        }})

        console.log(req.body.name);
        console.log(req.body.email);
        res.send(updateStudentname);
    } catch (err) {
        res.send(err)
    }
})

//delete

app.delete("/students/:name" , async (req,res) => {
    try {
        const student_name = req.params.name;
        const result = await student.deleteMany({name: student_name})
        res.send(result)
    } catch (err) {
        res.send(err)
    }
})
app.listen(4500, () =>{
    console.log("listening to server");
})