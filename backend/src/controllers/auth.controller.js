import { generateToken } from "../lib/utils.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  console.log(req.body);
  const { name, email, password, profilePic } = req.body;
  try {
    //not empty validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    //password length validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }

    //checking user existence first
    const isExisting = await UserModel.findOne({ email });
    if (isExisting) {
      return res.status(400).json({ message: "Email Already Existing" });
    }

    //create account

    //hashing through bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    if (newUser) {
      //create bypasses the select check it only works on the find, findOne ,findById, etc. Therefore, we need to explicity remove password field in return data

      const user = newUser.toObject();
      delete user.password;

      generateToken(user._id, res);
      return res
        .status(201)
        .json({ message: "User Signed Up Successfully", data: user });
    }
  } catch (error) {
    console.log("sign up controller error", error.message || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Required Both Fields" });
    }
    const isExisting = await UserModel.findOne({ email }).select("+password");
    if (!isExisting) {
      return res
        .status(404)
        .json({ message: "No Such Account Found.Please Sign Up" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExisting.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Email Or Password" });
    }

    const { password: _, ...userWithoutPassword } = isExisting.toObject();

    await generateToken(isExisting._id, res);

    return res
      .status(200)
      .json({ message: "Logged In Successfully", data: userWithoutPassword });
  } catch (error) {
    console.log("login controller error", error.message || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    const { user } = req;
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ message: `${user.name} Logout Successfully` });
  } catch (error) {
    console.log("logout controller error", error.message || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile Picture Required" });
    }
    const userId = req.user._id;
    const uploadRes = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadRes.secure_url,
      },
      { returnDocument: "after" },
    );
    return res.status(200).json({
      message: "Profile Picture Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("update user profile controller error", error.message || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//this will give back the authenticated user
export const checkAuth = (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("check auth controller: ", error.message || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
