/* eslint-disable */
import { auth, db } from "./firebase"; // Ensure Firebase and Firestore are properly imported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,  // Import getAuth from firebase/auth
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

// Function to create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Function to sign in with email and password
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function to sign in with Google and add user data to Firestore
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Add user data to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    // Add other user properties if needed
  });

  return user; // Return the user object if needed
};

// Function to sign out the user
export const doSignOut = () => {
  return auth.signOut();
};

// Function to reset password via email
export const doPasswordReset = (email) => {
  const actionCodeSettings = {
    // URL you want to redirect the user to after they reset their password.
    url: `${window.location.origin}/login`, // or any specific page you want to redirect to
    handleCodeInApp: true,  // Ensure the reset occurs in your app
  };
  return sendPasswordResetEmail(getAuth(), email, actionCodeSettings);
};


// Function to change password for the current user
export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

// Function to send email verification to the current user
export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,  // Redirect after verification
  });
};
