import errorHandler from "../../utilities/error.js"
import {Course} from "../../models/users.js"
import  mongoose  from "mongoose";


export const addCourse = (req, res) => {

  let body = req.body;
  
  console.log(mongoose.Types.ObjectId(req.params.id));
  try {

    const createCourse=new Course(
       {user: mongoose.Types.ObjectId(req.params.id) ,
        ...body
      })
    console.log(createCourse);
    if (createCourse) {
      res.json(errorHandler(false, "creating course!", createCourse))
    } else {
      return res.json(errorHandler(true, "Error creating course", {
        error: error.message
      }))
    }
    createCourse.save();
  } catch (error) {
    return res.json(errorHandler(true, "Error creating course"))
  }
};


export const getCourse = async (req, res) => {
  try {
    console.log(req.params.courseId);
    const allCourses = await Course.find(
      {_id:req.params.courseId},
      {
        user: 1,
        title: 1,
        image: 1,
        content: 1,
        link: 1,
        review: 1,
        rate: 1,
      }
    );
    console.log(allCourses);
    if (allCourses) {
      return res.json(errorHandler(false, "Fetching Course(s)", allCourses))
    } else {
      return res.json(errorHandler(true, "Error Fetching Course(s)"))
    }
  } catch (error) {
    return res.json(errorHandler(true, "Error fetching course"))
  }
}


export const fetchAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        _id: 1,
        user: 1,
        title: 1,
        review: 1,
        rate:1,
      }
    );
console.log(allCourses);
    if (allCourses) {
      return res.json(errorHandler(false, "Fetching Course(s)", allCourses))

    } else {
      return res.status(403).json(errorHandler(true, "Error Fetching Course(s)"))
    }
  } catch (error) {
    return res.status(400).json(errorHandler(true, "Error Fetching Course(s"))
  }
}