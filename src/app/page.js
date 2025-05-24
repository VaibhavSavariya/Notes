"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className=" mt-20 flex flex-col items-center justify-center  px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Notes App
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Create, edit, and manage your notes securely. Sign up or log in to get
        started!
      </p>
      <div className="flex gap-4">
        {status === "loading" ? null : session?.user ? (
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300 transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
