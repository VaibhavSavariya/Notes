import { NextResponse } from "next/server"; // Add this import if not present

export const authConfig = {
  pages: {
    signIn: "/login",
    signUp: "/signup",
    // error: "/error", // Error page URL
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Convert _id to string if it exists
        token._id = user._id?.toString ? user._id.toString() : user._id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Convert _id to string if it exists
        session.user._id = token._id?.toString
          ? token._id.toString()
          : token._id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  providers: [
    // ...your providers
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};
