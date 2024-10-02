// components/withAuth.js
import { CURRENT_ACTIVE_USER } from "@/utils/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      // Check if localStorage is accessible
      if (typeof localStorage !== "undefined") {
        if (localStorage.getItem(CURRENT_ACTIVE_USER)) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          router.replace("/login"); // Redirect to login page
        }
      }
    }, [router]);

    // If the user is authenticated, render the wrapped component
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    // Optionally render a loading state or nothing while checking authentication
    return null; // or a loading spinner
  };
  return AuthenticatedComponent;
};

export default withAuth;
