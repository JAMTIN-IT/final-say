"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserDoc, PlanTier, SubscriptionStatus } from "@/types/user";

interface AuthContextValue {
  user: User | null;
  userDoc: UserDoc | null;
  planTier: PlanTier | null;
  subscriptionStatus: SubscriptionStatus | null;
  loading: boolean;
  isLocked: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userDoc: null,
  planTier: null,
  subscriptionStatus: null,
  loading: true,
  isLocked: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setUserDoc(null);
        setLoading(false);
      }
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribeDoc = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        if (snap.exists()) {
          setUserDoc(snap.data() as UserDoc);
        } else {
          setUserDoc(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firestore user doc listener error:", error);
        setLoading(false);
      }
    );
    return unsubscribeDoc;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userDoc,
        planTier: userDoc?.planTier ?? null,
        subscriptionStatus: userDoc?.subscriptionStatus ?? null,
        loading,
        isLocked: userDoc?.isLocked ?? false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
