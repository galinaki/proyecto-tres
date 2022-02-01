import axios from "axios";
import { response } from "express";

const baseURL = "https://jan27lesson.herokuapp.com/api/users";
const signupURL = "https://jan27lesson.herokuapp.com/api/signup"
const loginURL = "https://jan27lesson.herokuapp.com/api/login";
const logoutURL = "https://jan27lesson.herokuapp.com/api/logout";
const deleteURL = "https://jan27lesson.herokuapp.com/api/delete:id";
const updateUserURL = "https://jan27lesson.herokuapp.com/api/update/:userName";
const findUserByIDURL = "https://jan27lesson.herokuapp.com/api/user/:id";

export const existingUserHandler = (token) =>
  axios({
    url: `${baseURL}`,
    headers: { Authorization: `${token}` },
  })
    .then((response) => {
      return response;
    });

export const currentUserHandler = (token, userName) =>
  axios({
    url: `${baseURL}/currentUser/${userName}`,
    headers: { Authorization: `${token}` },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });

export const signUpHandler = (props) =>
  axios({
    method: "post",
    url: `${signUpHandler}`,
    data: props,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
    
export const logOutHandler = () =>
  axios({
    url: `${logoutURL}`,
  })
    .then((response) => {
      console.log(error)
    })
    .catch((error) => {
      return error;
    });