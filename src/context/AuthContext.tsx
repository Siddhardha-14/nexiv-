"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export type UserRole = "student" | "mentor" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const profileData = userDoc.data() as UserProfile;
        setUserProfile(profileData);
        // Emergency offline cache storage
        if (typeof window !== "undefined") {
          localStorage.setItem(`nexiv_profile_${uid}`, JSON.stringify(profileData));
        }
      } else {
        console.warn("No matching Firestore user profile found for UID:", uid);
        setUserProfile(null);
      }
    } catch (error: any) {
      // Catch internet outages gracefully
      const isOffline = error.code === "unavailable" || error.message?.toLowerCase().includes("offline");
      
      if (isOffline) {
        console.warn("Firestore unreachable (Client is Offline). Restoring profile from local cache...");
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem(`nexiv_profile_${uid}`);
          if (cached) {
            try {
              setUserProfile(JSON.parse(cached));
              return;
            } catch (parseErr) {
              console.error("Corrupted local profile cache:", parseErr);
            }
          }
        }
      }
      
      if (!isOffline) {
        console.error("Error resolving Firestore user profile:", error);
      }
      setUserProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fast load from local cache first if available to reduce layout shifts
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem(`nexiv_profile_${currentUser.uid}`);
          if (cached) {
            try {
              setUserProfile(JSON.parse(cached));
            } catch {}
          }
        }
        // Fetch fresh background copy from Firestore
        await fetchUserProfile(currentUser.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        userProfile, 
        loading, 
        logout, 
        resetPassword,
        refreshProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth hook must be invoked within a valid <AuthProvider/> container.");
  }
  return context;
}
