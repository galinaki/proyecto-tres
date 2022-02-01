import { Review } from "../../models/users.js"
import mongoose from "mongoose"
import errorHandler from "../../utilties/error.js"

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