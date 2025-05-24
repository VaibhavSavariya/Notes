import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/app/utils/connectdb";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("No user found with the given email");
          }
          const isPasswordVaild = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordVaild) {
            throw new Error("Invalid password");
          }
          return user;
        } catch (error) {
          throw new Error(error.message || "Authorization failed");
        }
      },
    }),
  ],
});
