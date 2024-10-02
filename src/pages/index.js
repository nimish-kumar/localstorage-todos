import localFont from "next/font/local";
import Tasks from "./tasks";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function Home() {
  return <Tasks />;
}
