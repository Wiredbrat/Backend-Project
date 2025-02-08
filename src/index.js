// require("dotenv").config({path: "./env"}) // this is regular method to import dotenv 
import dotenv from "dotenv"
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import app from "./app.js"; // import the app from the app.js file

dotenv.config({path: "./env"}); // this is the es6 method to import dotenv

import databaseConnection from "./db/database.js"

databaseConnection() // call the function to connect to the database
.then(() => {
    app.on("error", (error) => {
        console.log("Error Connecting database:", error)
    })
    app.listen(process.env.PORT || 8000,() => {
        console.log(`Server is running : ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("Connection Failed ! ", error)
})









// method 1 to connect to the database. check the code in database.js for method 2
/*
(async() => {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ",error)
        })
        app.listen(process.env.PORT, () => {
            console.log("app is listening on port: ",process.env.PORT)
        })
    }
    catch(error) {
        console.error(error);
    }
})()
*/