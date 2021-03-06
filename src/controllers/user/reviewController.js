import { Review } from "../../models/users.js"
import mongoose from "mongoose"
import errorHandler from "../../utilities/error.js"

/**
 * GET REVIEWS
 */
export const getReviews = async (req, res) => {
  try {

    const allReviews = await Review.find(
      {},
      {
        _id: 1,
        course: 1,
        author:1,
        review: 1,
        rate: 1
      }
    );
console.log(allReviews);
    if (allReviews) {
      return res.json(errorHandler(false, "Fetching review(s)", allReviews))
    } else {
      return res.json(errorHandler(true, "Error Fetching review(s)"))
    }
  } catch (error) {
    return res.json(errorHandler(true, "Error Fetching review(s)"))
  }
}


export const createReview = async (req, res) => {
  let body = req.body;
  console.log(req.body,mongoose.Types.ObjectId(req.params.courseid));
  try {
   
    const createReview = new Review(
      // { user: mongoose.Schema.Types.ObjectId(req.params.userName),
      {
        course: mongoose.Types.ObjectId(req.params.courseid),
        ...body
      });
    
      console.log(createReview);
      // { new: true },
      
        if (createReview) {
          res.json(errorHandler(false, "creating review!", createReview))
        } else {
          return res.json(errorHandler(true, "Error creating review", {
            error: error.message
          }))
        }
    await createReview.save();
      } catch (error){
        return res.json(errorHandler(true, "Error creating review"))
      }
};

/**
 * DELETE REVIEW
 */
export const deleteReview = async (req, res) => {
  console.log(req.params.reviewid);
  try {
    Review.findByIdAndDelete(req.params.reviewid,
      { new: true }, (error, deletedReview) => {
        console.log(deletedReview);
        if (error) {
          return res.json(errorHandler(true, "Issues deleting review"))
        } else {
          res.json(errorHandler(false, "Deleting review", deletedReview))
        }
      })
  } catch (error) {
    return res.json(errorHandler(true, "Error deleting Review"))
  }
}

/**
 * UPDATE REVIEW
 */
export const updateReview = async (req, res) => {
  console.log(req.params.reviewid);
  console.log(mongoose.Types.ObjectId(req.params.id))

  try {
    Review.findOneAndUpdate(
      {
        _id: req.params.reviewid
      },req.body,
      { upsert:true },
      (error, review) => {
        if (error) {
          return res.json(errorHandler(true, "Issues updating a review"))
        } else {
          res.json(errorHandler(false, "Updating review", review))
        }

      })
  }
  catch (error) {
    return res.json(errorHandler(true, "Error updating review"))
  }
}

