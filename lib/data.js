import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// Rewritten features data
export const features = [
  {
    icon: <User className="h-6 w-6 text-blue-400" />,
    title: "Set Up Your Profile",
    description:
      "Register and build your profile to receive tailored health suggestions and services just for you.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-blue-400" />,
    title: "Schedule Visits",
    description:
      "Find doctors, check their timing, and book appointments that suit your lifestyle.",
  },
  {
    icon: <Video className="h-6 w-6 text-blue-400" />,
    title: "Live Video Calls",
    description:
      "Speak with licensed doctors via secure video from anywhere — no travel, no waiting rooms.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-blue-400" />,
    title: "Flexible Credit Plans",
    description:
      "Choose from affordable credit bundles to consult with doctors on your own terms.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-400" />,
    title: "Trusted Professionals",
    description:
      "All practitioners are thoroughly verified to ensure you receive safe and quality care.",
  },
  {
    icon: <FileText className="h-6 w-6 text-blue-400" />,
    title: "Your Medical Records",
    description:
      "Easily view your visit history, prescriptions, and doctor feedback — all in one place.",
  },
];

// Rewritten testimonials data
export const testimonials = [
  {
    initials: "JS",
    name: "Jeevan Singh.",
    role: "Patient",
    quote:
      "Video calls made it easy to get expert advice without missing work or driving to the clinic. Super convenient!",
  },
  {
    initials: "DB",
    name: "Dr. Balram S.",
    role: "Cardiologist",
    quote:
      "This app changed how I practice. I can now reach more people and offer care without location limits.",
  },
  {
    initials: "AV",
    name: "Anshul V.",
    role: "Patient",
    quote:
      "The credit packs work great for my whole family. We can consult specialists whenever something comes up.",
  },
];

// Rewritten credit system benefits
export const creditBenefits = [
  "Every doctor session costs <strong class='text-blue-400'>2 credits</strong>—regardless of how long it takes",
  "Your credits <strong class='text-blue-400'>never expire</strong>—use them whenever it suits you",
  "Get <strong class='text-blue-400'>new credits every month</strong> with our subscription plans",
  "Change or cancel your plan <strong class='text-blue-400'>anytime</strong>—no extra fees",
];
