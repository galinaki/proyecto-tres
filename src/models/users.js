import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    avatar: { type: String, required: false, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    confirmPassword: { type: String, required: true, trim: true },
    isAdmin: false,
  },
  { timestamps: true }
);

const courseSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    review: { type: String, required: true, trim: true },
    rate: [],
  }
)

const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    review: { type: String, required: true, trim: true },
    rate: { type: Number, required: true, trim: true },
  }
)

export const User = mongoose.model("User", userSchema, "users");
export const Course = mongoose.model("Course", courseSchema, "courses");
export const Review = mongoose.model("Review", reviewSchema, "reviews");