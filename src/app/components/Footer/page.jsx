"use client";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().getFullYear());
  }, []);
  return (
    <>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">&copy; {time} Notes App. All rights reserved.</p>
        <p className="text-xs mt-2">Built with Next.js and React.</p>
      </footer>
    </>
  );
};

export default Footer;
