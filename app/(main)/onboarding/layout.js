import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Onboarding - Arogya App",
  description: "Complete your profile to get started with medimeet",
};

const OnboardingLayout = async ({ children }) => {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "PATIENT") {
      redirect("/doctors");
    } else if (user.role === "DOCTOR") {
      if (user.verificationStatus === "VERIFIED") {
        redirect("/doctor");
      } else {
        redirect("/doctor/verification");
      }
    } else if (user.role === "ADMIN") {
      redirect("/admin");
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl text-transparent bg-clip-text pr-2 bg-gradient-to-b from-blue-500  to-blue-600 font-extrabold mb-2 ">Welcome to Arogya</h1>
          <p className="text-muted-foreground text-xl">Let us know how you'd like to use the platform.</p>
        </div>
        {children}</div>
    </div>
  );
};

export default OnboardingLayout;
