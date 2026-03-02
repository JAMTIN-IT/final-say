import { Timestamp } from "firebase/firestore";

export type TrusteeRelationship =
  | "spouse"
  | "child"
  | "sibling"
  | "friend"
  | "attorney"
  | "custom";

export type TrusteeRole =
  | "funeral_coordinator"
  | "digital_executor"
  | "financial_executor"
  | "emotional_support";

export type AccessLevel =
  | "full"
  | "funeral_only"
  | "digital_only"
  | "messages_only";

export type TrusteeStatus = "invited" | "confirmed" | "active";

export interface Trustee {
  id?: string;
  fullName: string;
  relationship: TrusteeRelationship | "";
  customRelationship: string;
  email: string;
  phone: string;
  roles: TrusteeRole[];
  accessLevel: AccessLevel | "";
  unlockConfirmationRequired: boolean;
  status: TrusteeStatus;
  updatedAt?: Timestamp;
}

export interface ImportantContact {
  id?: string;
  attorney: string;
  attorneyPhone: string;
  financialAdvisor: string;
  financialAdvisorPhone: string;
  doctor: string;
  doctorPhone: string;
  employer: string;
  employerPhone: string;
  religiousLeader: string;
  religiousLeaderPhone: string;
  funeralHome: string;
  funeralHomePhone: string;
  updatedAt?: Timestamp;
}
