
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {

 const user = await checkUser();

  return (
    <header className="w-full border-b-2 border-white/20 fixed top-0 bg-[#212327]/90 supports-[backdrop:filter]:bg-[#212327]/60 backdrop-blue-md z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <span className=" font-extrabold text-2xl md:text-3xl bg-gradient-to-br from-blue-600 via-blue-200 to-blue-800 animate-gradient hover:opacity-90 transition-opacity cursor-pointer bg-clip-text text-transparent">
             Arogya 
          </span>
        </Link>

        <div className="flex items-center gap-2">
             <SignedOut>
               <SignInButton>
                    <Button className={' bg-white/90 text-sm cursor-pointer'} variant={''}>
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
