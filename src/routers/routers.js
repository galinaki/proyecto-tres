import express from "express";
import { getReviews, createReview, deleteReview, updateReview } from "../controllers/user/reviewController.js";
import {addCourse,getCourse,fetchAllCourses} from "../controllers/user/addCourse.js";
<<<<<<< HEAD
import { fetchAllUsers, updateUser } from "../controllers/user/userController.js";
import  defaultController  from "../controllers/defaultController.js"
=======
import { fetchAllUsers, updateUser, deleteUser } from "../controllers/user/userController.js";
import defaultController from "../controllers/defaultController.js"
>>>>>>> 9a5874ba0ce7279cafe515aa5cd9cf8210b56bb0
import {signUpUser,loginUser,logoutUser} from "../controllers/auth/authController.js"
import cors from "cors"
// import { sign } from "jsonwebtoken";
// import { authRequired } from "../controllers/auth/authController.js"

const Router = express.Router();
const options={
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}
//Home Route
Router.get("/",cors(), defaultController)
  
  //Create/sign-up user 
  .post("/signup",cors(), signUpUser)

  //Get all users
  .get("/users",cors(), fetchAllUsers)

  //Login user
  .post("/login",cors(), loginUser)
  
  //Log out user
  .get("/logout",cors(), logoutUser)
  
  //Update user
  .put("/update/:userName",cors(), updateUser)

  
  //Delete user 
  .delete("/delete/:id",cors(), deleteUser)
  
//Get a course
  .get("/course/:courseId", getCourse)
  
//Get all courses
.get("/courses",cors(), fetchAllCourses)

//Create course 
.post("/user/:userName/:id/course",cors(), addCourse)

//Update review
// .put("/update/:userid/:id", updateReview)

//Delete review
.delete("/delete/:reviewid/:id",cors(), deleteReview)

  //Get all reviews
  .get("/reviews", getReviews)

  //Create review 
  .post("/user/:userName/:courseid/review",cors(), createReview)

  //Update review
  .put("/update/:userid/:id",cors(), updateReview)

  //Delete review
  .delete("/delete/:reviewid/:id",cors(), deleteReview);

//Add a course
export default Router;