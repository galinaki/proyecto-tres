import { Review } from "../../models/users.js"
import mongoose from "mongoose"
import errorHandler from "../../utilities/error.js"

/**
 * GET REVIEWS
 */
export const getReviews = async (req, res) => {
  try {

    console.log(req.params.reviewid);
    Review.findById(req.params.reviewid).populate("reviews").exec((error, reviews) => {
      // console.log(posts);
      if (reviews) {
        res.json(errorHandler(false, "Here are all your Posts", { reviews }));
      } else {
        res.json(errorHandler(true, "An error occurred getting your data", { error }))
      }
    });
  } catch (error) {
  }
}

/**
 * CREATE REVIEW
 */
export const createReview = (req, res) => {
  let body = req.body;

  try {
   
   const createReview = new Review(

      // { user: mongoose.Schema.Types.ObjectId(req.params.userName),
     {course: req.params.courseid,
     ...body
  })
      console.log(createReview)
      // { new: true },
      
        if (createReview) {
          res.json(errorHandler(false, "creating review!", createReview))
        } else {
          return res.json(errorHandler(true, "Error creating review", {
            error: error.message
          }))
        }
        createReview.save()
      } catch (error){
        return res.json(errorHandler(true, "Error creating review"))
      }
};

/**
 * DELETE REVIEW
 */
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

/**
 * UPDATE REVIEW
 */
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

