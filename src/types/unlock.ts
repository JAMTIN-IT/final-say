import { Timestamp } from "firebase/firestore";

export type UnlockStatus = "pending" | "approved" | "rejected";

export interface UnlockRequest {
  id?: string;
  userId: string;
  requestedBy: string;
  requestedAt: Timestamp;
  confirmations: string[];
  status: UnlockStatus;
  requiredConfirmations: number;
  deathCertificateUrl?: string;
  notes?: string;
}
