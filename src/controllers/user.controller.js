import dbConnect from "../lib/dbConnect.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
  await dbConnect();

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, null, "Username, email, and password are required");
  }

  const existingUserByUsername = await User.findOne({ username });


  const existingUserByEmail = await User.findOne({ email });

  if (existingUserByEmail) {
    return res.status(409).json({ message: "You have already registered, please login" });
  }

  if (existingUserByUsername) {
    throw new ApiError(409, null, "Username already taken. Please try another one");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const safeUser = await User.findById(newUser._id).select("-password");

  return res.status(201).json(new ApiResponse(201, safeUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  await dbConnect();

  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, null, "Please enter username and password");
  }

  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    throw new ApiError(404, null, "User does not exist. Please register or try again");
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, null, "Incorrect password");
  }

  const accessToken = jwt.sign({ id: existingUser._id }, process.env.ACCESS_SECRET, { expiresIn: "15m" });

  const loggedInUser = await User.findById(existingUser._id).select("-password");


  return res.status(200).json(
    new ApiResponse(200, {
      user: loggedInUser,
      accessToken,
    }, "User logged in successfully")
  );
});

export { registerUser, loginUser };
