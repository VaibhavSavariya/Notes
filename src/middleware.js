import { NextResponse } from "next/server";

export function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  const isPublicPath = pathname === "/login" || pathname === "/signup";
  const isPrivatePath =
    pathname === "/dashboard" ||
    pathname === "/edit-note/:id" ||
    pathname === "/create-note";
  const token = req.cookies.get("authjs.session-token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
}
