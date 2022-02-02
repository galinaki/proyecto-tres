import { User, Course, } from "../../models/users.js"
import mongoose from "mongoose"
import errorHandler from "../../utilities/error.js"

/**
 * USER CONTROLLER
 */
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
console.log(allUsers);
    if (allUsers) {
      return res.json(errorHandler(false, "Fetching User(s)", allUsers))
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


export const updateUser = (req, res) => {
  try {
    User.findOneAndUpdate(
      { userName: req.params.userName },
      req.body,
      { new: true },
      (error, updatedUser) => {
        if (updatedUser) {
          res.json(errorHandler(false, "Updated User", updatedUser))
        } else {
          return res.json(errorHandler(true, "Error Updating User", {
            error: error.message
          }))
        }
      }
    )
  }
  catch (error) {
    return res.json(errorHandler(true, "Error updating user"))
  }
};

// export const 