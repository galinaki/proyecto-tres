import { User } from "../../models/user.js";
import errorHandler from "../../utilities/error.js";
import { securePassword } from "../../utilities/securePassword.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// import "dotenv/config";


export const createToken = id => {
  const SECRET = process.env.SECRET;
  return jwt.sign({ id }, SECRET, { expiresIn: 84000 });
};


export const authRequired = (req, res, next) => {
  const SECRET = process.env.SECRET || "home";
  // const token = req.cookies.jwt;
  console.log(SECRET);
  console.log(req.headers.authorization);
  console.log(req.headers);
  const token = req.headers.authorization;
  console.log(token);

  if (token) {
    jwt.verify(token, SECRET, (error, decodedTkn) => {
      if (error) {
        return res
          .status(401)
          .json(errorHandler(true, "Auth Error"))
        // .redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.status(401).json(errorHandler(true, "Auth Error"));
  }
};

/**
 * Signs up a user
 * @param {*} req
 * @param {*} res
 */
export const signUpUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email.toLowerCase(),
      userName: req.body.userName,
    }).lean(true);

    if (existingUser) {
      // res.status(403);
      console.log(existingUser);
      return res.json(errorHandler(true, "A user exists with thes credential"));
    }

    const newUser = new User({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isAdmin: req.body.isAdmin,
    });

    if (newUser) {
      const token = createToken(newUser._id);
      res.cookie("jwt", token, { maxAge: 840000 });

      newUser.password = await securePassword(newUser.password);
      newUser.confirmPassword = newUser.password;

      res.json(
        errorHandler(
          false,
          `Hi ${newUser.firstName.toUpperCase()}! A warm welcome to my User API!`,
          { user: newUser._id }
        )
      );
      await newUser.save();

      // res.status(201);
    } else {
      // res.status(403);
      return res.json(errorHandler(true, "Error Registering a new User"));
    }
  } catch (error) {
    // res.status(400);
    console.error(error.message);
    return res.json(errorHandler(true, "Error Registering a new User"));
  }
};



export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      {
        email: req.body.email.toLowerCase()
      },
      { confirmPassword: 0, }
    );
    if (!user) {
      return res.json(
        errorHandler(true, "A user with this email does not exist")
      );
    }
    const auth = await bcrypt.compare(req.body.password, user.password);
    if (!auth) {
      return res.json(
        errorHandler(true, "Password is incorrect"));
    }

    const { userName } = user;
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: "true",
      maxAge: 84000,
    });
    res.json(errorHandler(false, `Welcome back ${userName}`, {
      user,
      token,
    }));
    req.session.user = user;

  } catch (error) {
    return res.json(errorHandler(true, "Trouble Logging in user"));
  }
}

export const logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }).redirect("/api");