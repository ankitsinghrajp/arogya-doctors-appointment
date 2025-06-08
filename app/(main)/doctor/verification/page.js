import { getCurrentUser } from "@/actions/onboarding";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ClipboardCheck, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const VerificationPage = async () => {
  const user = await getCurrentUser();

  //If already verified, redirect to dashboard
  if (user?.verificationStatus === "VERIFIED") {
    redirect("/doctor");
  }

  const isRejected = user?.verificationStatus === "REJECTED";

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <Card
          className={
            "border-1 border-blue-900/80 shadow-md shadow-black/40 bg-[#292a2d]"
          }
        >
          <CardHeader className={"text-center"}>
            <div
              className={`mx-auto p-4 ${
                isRejected ? "bg-red-900/20" : "bg-amber-900/20"
              } rounded-full mb-4 w-fit`}
            >
              {isRejected ? (
                <XCircle className="h-8 w-8 text-red-400" />
              ) : (
                <ClipboardCheck className="h-8 w-8 text-amber-400" />
              )}
            </div>
            <CardTitle className={"text-2xl font-bold text-white"}>
              {isRejected
                ? "Verification Declined"
                : "Verification in Progress"}
            </CardTitle>
            <CardDescription className={"text-lg "}>
              {isRejected
                ? "Unfortunately your application needs revision"
                : "Thank you for submitting your information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isRejected ? (
              <div className="bg-red-900/10 border border-red-900/20 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground text-left">
                  <p className="mb-2">
                    Our team has carefully evaluated your application and
                    determined that it does not meet our guidelines at this
                    time. Typical reasons for rejection include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Missing or unclear credential documents.</li>
                    <li>Does not meet the required professional experience.</li>
                    <li>Service description is incomplete or lacks clarity.</li>
                  </ul>
                  <p>
                    Feel free to add more details to your application and submit
                    it again for another review.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-900/10 border border-blue-900/20 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground text-left">
                  Our administrative team is currently reviewing your profile.
                  This usually takes 1–2 business days. You&apos;ll be notified
                  via email once your account is verified.
                </p>
              </div>
            )}
            <p className="text-muted-foreground mb-6">
              {isRejected
                ? "You may revise your doctor profile and submit it again for verification."
                : "In the meantime, feel free to explore the platform or contact our support team with any questions."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center ">
              <Button
              asChild
              className={' w-full'}
              >
             <Link href={'/'}>
             Return to Home
             </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  return <div>VerificationPage</div>;
};

export default VerificationPage;
