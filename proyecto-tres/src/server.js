import mongoose from "mongoose"
import express from "express";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//Mongoose server starts
// initMongoServer();
// express to translate the response from the database to JSON
const app = express();
app.use(express.json());
//when making requests the cors headers can cause issues without this
app.use(cors());

const PORT = process.env.PORT || 3000;

//database connected using mongoose
const db = mongoose.connection;
// app.use("/api",reviewer);//come back later when reviewer is made

//app is now working with server side information to create 
//JSON specific file formats to manipulate and log back any issues
app.use(cookieParser());
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));
app.use(logger('combined'));

//response on database connection
db.on("error", error => console.log(error.message));
db.on("connected", () => console.log("Mongo is connected"));
db.on("disconnected", () => console.log("Mongo is disconnected"));

//listen method to log back responses from database i.e. mongoose methods etc....
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})