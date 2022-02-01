import express from "express";
import { getReviews, createReview, deleteReview, updateReview } from "../controllers/user/reviewController.js";
import { fetchAllUsers } from "../controllers/user/userController.js";
import {signUpUser,loginUser,logoutUser} from "../controllers/auth/authController.js"
// import { authRequired } from "../controllers/auth/authController.js"

const Router = express.Router();

//Home Route
Router.get("/",)
  
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
  
//Get all reviews
  .get("/reviews", getReviews)

//Create review 
  .post("/user/:userName/review", createReview)

//Update review
  .put("/update/:userid/:id", updateReview)

//Delete review
  .delete("/delete/:reviewid/:id", deleteReview)

//Add a course

export default Router;