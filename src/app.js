import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true, // expolore its option using ctrl+space and read cors docs on npmjs
    }
)); // use cors to allow cross origin requests

app.use(express.json({limit: "1mb"})) // use express.json() to parse the incoming requests with JSON payloadss
app.use(express.urlencoded({extended :true, limit: "1mb"})) // use express.urlencoded() to parse the incoming url requests with urlencoded payloads
app.use(cookieParser()) // use cookieParser to parse the incoming requests with cookies

export { app }; // export the app to be used in the index.js file