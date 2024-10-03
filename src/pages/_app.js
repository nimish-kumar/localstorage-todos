import StoreProvider from "@/redux/StoreProvider";
import "@/styles/globals.css";
import { CURRENT_ACTIVE_USER } from "@/utils/constants";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const path = router.route;
    if (path === "/tasks" && !localStorage.getItem(CURRENT_ACTIVE_USER)) {
      router.replace("/login");
    }
    if (
      (path === "/login" || path === "/signup") &&
      localStorage.getItem(CURRENT_ACTIVE_USER)
    ) {
      router.replace("/tasks");
    }
  }, []);
  return (
    <div className={`${geistSans.variable} flex justify-center min-h-screen`}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}
