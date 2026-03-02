import { Timestamp } from "firebase/firestore";

export type AccountCategory =
  | "social_media"
  | "email"
  | "financial"
  | "streaming"
  | "gaming"
  | "work"
  | "other";

export type DeathInstruction =
  | "delete"
  | "memorialize"
  | "transfer_to_trustee"
  | "keep_active";

export interface DigitalAccount {
  id?: string;
  platformName: string;
  platform: string;
  category: AccountCategory | "";
  email: string;
  username: string;
  password: string;
  twoFaCodes: string;
  deathInstruction: DeathInstruction | "";
  onDeath: DeathInstruction | "";
  nominatedTrusteeId: string;
  notes: string;
  updatedAt?: Timestamp;
}

export interface DeviceAccess {
  id?: string;
  deviceName: string;
  deviceType: string;
  pin: string;
  backupPin: string;
  location: string;
  notes: string;
  updatedAt?: Timestamp;
}

export interface InsurancePolicy {
  provider: string;
  policyNumber: string;
  contact: string;
}

export interface FinancialPointer {
  id?: string;
  institution: string;
  accountType: string;
  referenceNumber: string;
  contactPerson: string;
  contactNumber: string;
  notes: string;
  documentUrl: string;
  updatedAt?: Timestamp;
}

export type FinancialPointers = FinancialPointer;
