import { Timestamp } from "firebase/firestore";

export type PlanTier = "essential" | "legacy" | "family";
export type SubscriptionStatus = "active" | "suspended" | "cancelled" | "inactive";

export interface UserDoc {
  email: string;
  displayName: string;
  createdAt: Timestamp;
  subscriptionStatus: SubscriptionStatus;
  planTier: PlanTier | null;
  stripeCustomerId: string | null;
  isLocked: boolean;
}

export interface UserProfile {
  id?: string;
  fullLegalName: string;
  preferredName: string;
  dateOfBirth: string;
  idNumber: string;
  nationality: string;
  countryOfResidence: string;
  photoURL: string;
  bio: string;
  updatedAt?: Timestamp;
}
