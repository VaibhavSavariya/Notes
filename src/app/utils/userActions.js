"use server";
import User from "@/models/userModel";
import { signIn } from "../../../auth";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/utils/connectdb";
export async function loginUser(formData) {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!res || res.error) {
      return {
        success: false,
        error: res?.error || "Invalid credentials",
      };
    }
    return {
      success: true,
      redirectTo: "/dashboard",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
}

export async function RegisterUser(formData) {
  try {
    await connectDB();
    const { username, email, password } = formData;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      throw new Error("User already exists with this username or email");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return {
      success: true,
      message: "User registered successfully",
      userId: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
}
