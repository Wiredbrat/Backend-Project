import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// method 2 to connect to the database. check the commented code in index.js for method 1

const databaseConnection = async () => {
    try{
        const connectiontodb = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // connect to the database using the MONGODB_URI from the .env file and DB_NAME from the constants.js file
        console.log("MongoDb Connected: ", connectiontodb.connection.host) // log the host of the connection. read more about connection.host in the mongoose documentation
    }
    catch(error) {
        console.log("MongoDB connection error: ",error)
        process.exit(1); // exit the process if there is an error. read more about process.exit() in the nodejs documentation

    }
}

export default databaseConnection; // export the function to be used in the index.js file