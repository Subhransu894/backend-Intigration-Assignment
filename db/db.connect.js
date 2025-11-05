const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;

const initiallizeDatabase=async()=>{
    await mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to Database Successfully")
    }).catch((error)=>console.log("Error connecting to DB", error));
}
module.exports = {initiallizeDatabase}