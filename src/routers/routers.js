import express from "express";
import { getReviews, createReview, deleteReview, updateReview } from "../controllers/user/reviewController.js";
import { addCourse, getCourse, fetchAllCourses } from "../controllers/user/addCourse.js";
import { fetchAllUsers, updateUser, deleteUser } from "../controllers/user/userController.js";
import defaultController from "../controllers/defaultController.js"
import { signUpUser, loginUser, logoutUser, authRequired } from "../controllers/auth/authController.js"
import cors from "cors"
// import { sign } from "jsonwebtoken";
// import { authRequired } from "../controllers/auth/authController.js"

const Router = express.Router();
const options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}
//Home Route
Router.get("/", cors(), defaultController)

  //Create/sign-up user 
  .post("/signup", cors(), signUpUser)

  //Get all users
  .get("/users", cors(), authRequired, fetchAllUsers)

  //Login user
  .post("/login", cors(), loginUser)

  //Log out user
  .get("/logout", cors(), logoutUser)

  //Update user
  .put("/update/:userName", cors(), authRequired, updateUser)


  //Delete user 
  .delete("/delete/:id", cors(), authRequired, deleteUser)

  //Get a course
  .get("/courses/:courseId", cors(), getCourse)

  //Get all courses
  .get("/courses", cors(), fetchAllCourses)

  //Create course 
  .post("/addcourse", cors(), authRequired, addCourse)


  //Get all reviews
  .get("/reviews", getReviews)

  //Create review 
  .post("/courses/addreview/:courseid", cors(), authRequired, createReview)

  .put("/update/:userid/:id", cors(), authRequired, updateReview)

  //Delete review
  .delete("/delete/review/:reviewid", cors(), authRequired, deleteReview);

//Add a coursegi
export default Router;