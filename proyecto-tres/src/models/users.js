import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
    userName: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true },
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true },
		password: { type: String, required: true, trim: true },
		confirmPassword: { type: String, required: true, trim: true },
		isAdmin: false,
	},
	{ timestamps: true }
);

const contentSchema = mongoose.Schema(
  {
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    content: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true}
  }
)

export const User = mongoose.model("User", userSchema, "users");
export const Content = mongoose.model("Content", contentSchema, "Contents")