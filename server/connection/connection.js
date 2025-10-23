import mongoose from "mongoose";

mongoose.connect(
    "mongodb+srv://riteshtelkar28:root@cluster0.kuuapkg.mongodb.net/"
).then(()=>console.log("database connected")).catch((error)=>console.log(error))