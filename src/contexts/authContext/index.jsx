/* eslint-disable */
// Import necessary modules
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

// Create AuthContext
const AuthContext = React.createContext();

// Export custom hook useAuth
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
  // State variables
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Effect hook to handle authentication state changes
  useEffect(() => {
    // Firebase onAuthStateChanged listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set current user
        setCurrentUser(user);

        // Check if the provider is email/password login
        const isEmail = user.providerData.some(
          (provider) => provider.providerId === "password"
        );

        // Check if the auth provider is Google or not
        const isGoogle = user.providerData.some(
          (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
        );

        // Set userLoggedIn based on authentication provider
        setUserLoggedIn(isEmail || isGoogle);
      } else {
        // Reset current user and set userLoggedIn to false
        setCurrentUser(null);
        setUserLoggedIn(false);
      }

      // Set loading to false
      setLoading(false);
    });

    // Unsubscribe from onAuthStateChanged listener when component unmounts
    return unsubscribe;
  }, []);

  // Value passed to AuthContext.Provider
  const value = {
    currentUser,
    userLoggedIn,
  };

  // Return AuthContext.Provider with value and children
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
