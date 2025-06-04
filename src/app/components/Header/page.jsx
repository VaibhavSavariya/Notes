"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const handleSignOut = () => {
    // localStorage.clear();
    signOut({ callbackUrl: "/login" });
  };
  return (
    <>
      <header className="bg-gray-800 text-white py-4 pl-10 pr-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notes App</h1>
          <nav>
            <ul className="flex space-x-4">
              {status === "loading" ? null : session?.user ? (
                <>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="hover:underline bg-transparent border-none text-white cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="hover:underline">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="hover:underline">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
