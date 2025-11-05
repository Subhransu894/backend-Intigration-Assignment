const express = require("express");
const app = express();

const cors = require("cors");
const corOption={
    origin:"*",
    credentials:true
}

const {initiallizeDatabase} = require("./db/db.connect")
const Event = require("./models/event.models")

app.use(express.json())
app.use(cors(corOption))

initiallizeDatabase()

//testing-purpose to create a event in DB
async function createEvent(newEvent) {
    try {
        const event = new Event(newEvent);
        const saveEvent = await event.save();
        return saveEvent;
    } catch (error) {
        console.log(error);
    }
}
app.post("/events",async(req,res)=>{
    try {
        const savedEvent = await createEvent(req.body);
        res.status(201).json({message:"event add successfully",event:savedEvent})
    } catch (error) {
        res.status(500).json({error:"Failed to add event"})
    }
})

//get all the events
async function readAllEvent(){
    try {
        const findAllEve = await Event.find();
        return findAllEve;
    } catch (error) {
        console.log("Error:- ",error)
    }
}
app.get("/events",async(req,res)=>{
    try {
        const event = await readAllEvent();
        if(event.length != 0){
            res.json(event)
        }else{
            res.status(404).json({error:"Event doesn't exist"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch event"})
    }
})

//get by id
async function readById(eventId) {
    try {
        const findByEveId = await Event.findById(eventId)
        return findByEveId
    } catch (error) {
        console.log("Error ",error)
    }
}
app.get("/events/:eId",async(req,res)=>{
    try {
        const event = await readById(req.params.eId);
        if(event){
            res.json(event)
        }
        else{
            res.status(404).json({error:"Event does not exist"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch events"})
    }
})

//post for update 
async function updateById(eveId,dataToUpdate) {
    try {
        const updateUrl = await Event.findByIdAndUpdate(eveId,dataToUpdate,{new:true});
        return updateUrl;
    } catch (error) {
        console.log("Error",error)
    }
}
app.post("/events/:eId",async(req,res)=>{
    try {
        const updatedUrl = await updateById(req.params.eId,req.body);
        res.status(201).json({message:"event data update successfully",updatedUrl:updatedUrl})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch events"})
    }
})

const PORT=3000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})