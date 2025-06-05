
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {

  return (
    <header className="w-full border-b border-white/20 fixed top-0 bg-[#212327]/90 supports-[backdrop:filter]:bg-[#212327]/60 backdrop-blue-md z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <span className=" font-extrabold text-2xl md:text-3xl bg-gradient-to-br from-rose-600 via-red-600 to-orange-500 animate-gradient hover:opacity-90 transition-opacity cursor-pointer bg-clip-text text-transparent">
             Arogya 
          </span>
        </Link>

        <div className="flex items-center gap-2">
             <SignedOut>
               <SignInButton>
                    <Button className={'font-semibold text-sm cursor-pointer'} variant={'outline'}>
                        Login
                    </Button>
               </SignInButton>
              
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
