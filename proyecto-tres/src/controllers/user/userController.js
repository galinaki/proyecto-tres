import { User, Course, Review } from "../../models/users.js"
import mongoose from "mongoose"
import errorHandler from "../../utilties/error.js"

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

/**
 * REVIEW CONTROLLERS
 */
export const getReviews = async (req, res) => {
  try {

    console.log(req.params.reviewid);
    Review.findById(req.params.reviewid).populate("reviews").exec((error, reviews) => {
      console.log(posts);
      if (reviews) {
        res.json(errorHandler(false, "Here are all your Posts", { reviews }));
      } else {
        res.json(errorHandler(true, "An error occurred getting your data", { error }))
      }
    });
  } catch (error) {
  }
}

export const addReview = async (req, res) => {
  try {
    Review.create(req.body, (error, post) => {
      if (error) {
        res.redirect("/api")
        throw new Error(error);
      }
    })
    Review.save()
  } catch (error) {
    res.json(errorHandler(true, "Error creating Post", { error: error.message }))
  }
}

export const deleteReview = async (req, res) => {
  console.log(req.params.userid, req.params.id);
  try {
    Review.findByIdAndDelete(req, params.reviewid),

      { new: true }, (error, deletedReview) => {
        console.log(deletedReview);
        if (error) {
          return res.json(errorHandler(true, "Issues deleting review"))
        } else {
          res.json(errorHandler(false, "Deleting review", deletedReview))
        }
      }
  } catch (error) {
    return res.json(errorHandler(true, "Error deleting Review"))
  }
}

export const updateReview = async (req, res) => {
  console.log(req.params.userid);
  console.log(mongoose.Types.ObjectId(req.params.id))

  try {
    Review.findOneAndUpdate(
      {
        _id: req.params.reviewid
      },
      {
        $set: {
          'reviews.$.review': req.body.review
        }
      },
      { new: true },
      (error, review) => {
        if (error) {
          return res.json(errorHandler(true, "Issues updating a review"))
        } else {
          res.json(errorHandler(false, "Updating review", review))
        }

      })
  }
  catch (error) {
    return res.json(errorHandler(true, "Error deleting review"))
  }
}