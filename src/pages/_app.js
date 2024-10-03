import "@/styles/globals.css";
import localFont from "next/font/local";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`${geistSans.variable} flex items-center justify-center min-h-screen`}
    >
      <Component {...pageProps} />
    </div>
  );
}
