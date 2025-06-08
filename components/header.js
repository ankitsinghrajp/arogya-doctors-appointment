
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { checkUser } from "@/lib/checkUser";
import { Calendar, CreditCard, ShieldCheck, Stethoscope, User } from "lucide-react";
import { checkAndAllocateCredits } from "@/actions/credits";
import { Badge } from "./ui/badge";

const Header = async () => {

 const user = await checkUser();

 if(user?.role === "PATIENT"){
  await checkAndAllocateCredits(user);
 }
 

  return (
    <header className="w-full border-b-2 border-white/20 fixed top-0 bg-[#212327]/90 supports-[backdrop:filter]:bg-[#212327]/60 backdrop-blue-md z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <span className=" font-extrabold text-2xl md:text-3xl bg-gradient-to-br from-blue-600 via-blue-200 to-blue-800 animate-gradient hover:opacity-90 transition-opacity cursor-pointer bg-clip-text text-transparent">
             Arogya 
          </span>
        </Link>

        <div className="flex items-center gap-4">
              <SignedIn>

                   {user?.role === "ADMIN" && (
                  <Link className="cursor-pointer" href={"/admin"} >
                    <Button
                    variant={'outline'}
                    className={'hidden md:inline-flex items-center gap-2'}
                    >
                      <ShieldCheck className="h-4 w-4"/>
                      Admin Dashboard
                    </Button>
                    <Button
                    variant={'ghost'}
                    className={'md:hidden w-10 h-10 p-0'}
                    >
                      <ShieldCheck className="h-4 w-4"/>
                    </Button>
                  </Link>
                )}

                {user?.role === "DOCTOR" && (
                  <Link href={"/doctor"} >
                    <Button
                    variant={'outline'}
                    className={'hidden cursor-pointer md:inline-flex items-center gap-2'}
                    >
                      <Stethoscope className="h-4 w-4"/>
                      Doctor Dashboard
                    </Button>
                    <Button
                    variant={'ghost'}
                    className={'md:hidden w-10 h-10 p-0'}
                    >
                      <Stethoscope className="h-4 w-4"/>
                    </Button>
                  </Link>
                )}

                {user?.role === "PATIENT" && (
                  <Link href={"/appointments"} >
                    <Button
                    variant={'outline'}
                    className={'hidden md:inline-flex cursor-pointer items-center gap-2'}
                    >
                      <Calendar className="h-4 w-4"/>
                      My Appointments
                    </Button>
                    <Button
                    variant={'ghost'}
                    className={'md:hidden w-10 h-10 p-0'}
                    >
                      <Calendar className="h-4 w-4"/>
                    </Button>
                  </Link>
                )}

                {user?.role === "UNASSIGNED" && (
                  <Link href={'/onboarding'}>
                    <Button
                    variant={'outline'}
                    className={'hidden md:inline-flex cursor-pointer items-center gap-2'}
                    >
                    <User className="h-4 w-4"/>
                    Complete Profile
                    </Button>
                    <Button variant={'ghost'} className={'md:hidden w-10 h-10 p-0'}>
                      <User className="h-4 w-4"/>

                    </Button>
                  </Link>
                )}
              </SignedIn>

              {(!user || user?.role === "PATIENT" ) && (
                <Link href={'/pricing'} >
                  <Badge
                  variant="outline"
                  className="h-9 bg-blue-900/20 border-blue-700/30 px-3 py-1 flex items-center gap-2">
                    <CreditCard className="h-3.5 w-3.5 text-blue-400"/>
                    <span className="text-blue-400">
                      {user && user?.role === "PATIENT"?(
                        <>
                        {user.credits} {" "}
                        <span className="hidden md:inline">Credits</span>
                        </>
                      ):(
                        <>Pricing</>
                      )}

                    </span>
                  </Badge>
                </Link>
              )}
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
