// src/Provider/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// 1️⃣ Create Context
export const AuthContext = createContext(null);

// 2️⃣ Google Provider
const googleProvider = new GoogleAuthProvider();

// 3️⃣ AuthProvider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Register User
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Login User
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google Login
  const googleSignIn = () => signInWithPopup(auth, googleProvider);

  // ✅ Update Profile
  const updateUserProfile = (profile) => {
    if (!auth.currentUser) return Promise.reject("No user logged in");
    return updateProfile(auth.currentUser, profile);
  };

  // ✅ Logout
  const logOut = () => {
    setLoading(true);
    return firebaseSignOut(auth).finally(() => setLoading(false));
  };

  // 🔑 Listen to Auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    googleSignIn,
    logOut,
    updateUserProfile
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
