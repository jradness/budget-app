import { isAuthenticated } from "./utils/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const protectedRoutes = ["/dashboard"];


export default function middleware(req: NextRequest) {
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/account/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
