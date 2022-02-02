import express from "express";
import { getReviews, createReview, deleteReview, updateReview } from "../controllers/user/reviewController.js";
import {addCourse,getCourse,fetchAllCourses} from "../controllers/user/addCourse.js";
import { fetchAllUsers } from "../controllers/user/userController.js";
import {signUpUser,loginUser,logoutUser} from "../controllers/auth/authController.js"
// import { sign } from "jsonwebtoken";
// import { authRequired } from "../controllers/auth/authController.js"

const Router = express.Router();

//Home Route
Router.get("/", signUpUser)
  
  //Create/sign-up user 
  .post("/signup", signUpUser)

  //Get all users
  .get("/users", fetchAllUsers)

  //Login user
  .post("/login", loginUser)
  
  //Log out user
  .get("/logout", logoutUser)
  
  //Update user
  .put("/update/:userName",)
  
  //Delete user 
  .delete("/delete/:id",)
  
//Get a review
  .get("/course/:courseId", getCourse)
  
//Get all reviews
.get("/courses", fetchAllCourses)

//Create review 
.post("/user/:userName/:id/course", addCourse)

//Update review
// .put("/update/:userid/:id", updateReview)

//Delete review
// .delete("/delete/:reviewid/:id", deleteReview);

  //Get all reviews
  .get("/reviews", getReviews)

  //Create review 
  .post("/user/:userName/:course/review", createReview)

  //Update review
  .put("/update/:userid/:id", updateReview)

  //Delete review
  .delete("/delete/:reviewid/:id", deleteReview);

//Add a course
export default Router;