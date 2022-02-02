import errorHandler from "../../utilities/error.js"
import {Course} from "../../models/users.js"

export const addCourse = (req, res) => {
  let body = req.body;
  // console.log(req.params);
  // console.log(body);
  try {
    const createCourse=new Course(
       {user: req.params.userName ,
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
  } catch (error) {
    return res.json(errorHandler(true, "Error creating course"))
  }
};
