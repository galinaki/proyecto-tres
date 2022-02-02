import mongoose from "mongoose";
import express from "express";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { initMongoServer } from "./db/connection.js";
import user from "./routers/routers.js";
//Mongoose server starts
//database connected using mongoose
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
// express to translate the response from the database to JSON
const app = express();
initMongoServer();
//app is now working with server side information to create
//JSON specific file formats to manipulate and log back any issues
app
	.use(cookieParser())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(logger("combined"))

	.use(express.json())
	//when making requests the cors headers can cause issues without this
	.use(cors())
	.use("/api", user); //come back later when reviewer is made

//response on database connection
db.on("error", error => console.log(error.message));
db.on("connected", () => console.log("Mongo is connected"));
db.on("disconnected", () => console.log("Mongo is disconnected"));

//listen method to log back responses from database i.e. mongoose methods etc....
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
