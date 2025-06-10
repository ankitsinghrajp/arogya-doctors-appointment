import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { Toaster } from "sonner";
import RouteLoader from "@/components/route-loader";
const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Arogya - Connects. Anytime. Anywhere",
  description:
    "Arogya is a digital health platform that lets you consult certified doctors anytime through secure video calls with a smart freemium model.",
};

export default function RootLayout({ children }) {
  return (
     <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
     >
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#292a2d]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RouteLoader>
          {/* header  */}
          <Header/>

          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
         <Footer/>
         </RouteLoader>
         
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
