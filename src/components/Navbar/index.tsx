"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { IconPlant } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <>
      <div className="navbar px-10 py-2 bg-base-300">
        <div className="navbar-start">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center py-2 rounded-lg hover:bg-base-200 transition-colors duration-300"
          >
            <IconPlant size={56} className="text-secondary mx-2" />
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex items-baseline gap-[2px]">
                <span className="text-primary font-extrabold text-xl">
                  Agri
                </span>
                <span className="text-accent font-semibold text-xl">Scan</span>
                <span className="text-secondary font-semibold text-xl">AI</span>
              </div>
              <hr className="w-full border border-base-content" />
              <span className="text-sm text-base-content/70 italic">
                Empowering Farmers with Vision—Detect Leaf Diseases Instantly
              </span>
            </div>
          </Link>
        </div>

        <div className="navbar-end space-x-3">
          <Link href="/login" className="btn btn-accent">
            Login
          </Link>
          <Link href="/signup" className="btn btn-accent">
            Sign Up
          </Link>
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Navbar;
