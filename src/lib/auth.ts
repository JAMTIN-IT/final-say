import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function signUp(email: string, password: string, displayName: string): Promise<User> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName });
  await setDoc(doc(db, "users", credential.user.uid), {
    email,
    displayName,
    createdAt: serverTimestamp(),
    subscriptionStatus: "inactive",
    planTier: null,
    stripeCustomerId: null,
    isLocked: false,
  });
  return credential.user;
}

export async function signIn(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function googleSignIn(): Promise<User> {
  const credential = await signInWithPopup(auth, googleProvider);
  const user = credential.user;
  const userRef = doc(db, "users", user.uid);
  await setDoc(
    userRef,
    {
      email: user.email,
      displayName: user.displayName,
      createdAt: serverTimestamp(),
      subscriptionStatus: "inactive",
      planTier: null,
      stripeCustomerId: null,
      isLocked: false,
    },
    { merge: true }
  );
  return user;
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export function mapAuthError(code: string): string {
  const errors: Record<string, string> = {
    "auth/user-not-found": "We couldn't find an account with that email.",
    "auth/wrong-password": "That password doesn't match.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Please choose a stronger password (at least 6 characters).",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again in a moment.",
    "auth/network-request-failed": "Connection issue. Please check your internet and try again.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/invalid-credential": "That email or password doesn't seem right.",
  };
  return errors[code] || "Something went wrong. Please try again.";
}
