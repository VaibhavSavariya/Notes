import { NextResponse } from "next/server"; // Add this import if not present

export const authConfig = {
  pages: {
    signIn: "/login",
    signUp: "/signup",
    // error: "/error", // Error page URL
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const inRoute = nextUrl.pathname;

      if (isLoggedIn) {
        if (inRoute === "/signup" || inRoute === "/login") {
          return NextResponse.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      } else {
        if (inRoute === "/login" || inRoute === "/signup") return true;
        return false;
      }
    },
  },
  providers: [
    // ...your providers
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};
