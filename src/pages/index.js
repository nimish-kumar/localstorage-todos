import SignIn from "@/components/SignIn";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist-sans`}
    >
      <SignIn />
    </div>
  );
}
