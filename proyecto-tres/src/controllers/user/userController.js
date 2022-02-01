import { User, Course, Review } from "../../models/users.js"
import mongoose from "mongoose"

export const fetchAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find(
      {},
      {
        _id: 1,
        userName: 1,
        avatar: 1,
      }
    );

    if (allUsers) {
      return res.json(errorHandler(false, "Fetching User(s)", allUsers()))
    } else {
      return res.status(403).json(errorHandler(true, "Error Fetching User(s)"))
    }
  } catch (error) {
    return res.status(400).json(errorHandler(true, "Error Fetching user(s"))
  }
}

export const deleteUser = async (req, res) => {
  try {
    User.findByIdAndRemove(
      req.params.id,
      { new: true },
      (error, deletedUser) => {
        if (deletedUser) {
          return res.json(errorHandler(false, "Deleting User", deletedUser))
        } else {
          return res.jjson(errorHandler(true, "Error Deleting User"))
        }
      })
  } catch (error) {
    return res.json(errorHandler(true, "Error deleting user"))
  }
};



