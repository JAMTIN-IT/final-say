import { Timestamp } from "firebase/firestore";

export type DependantType = "minor_child" | "adult_dependent" | "pet" | "child" | "parent" | "other";

export interface Dependant {
  id?: string;
  name: string;
  type: DependantType | "";
  nominatedGuardian: string;
  guardian: string;
  guardianEmail: string;
  careInstructions: string;
  fundingSource: string;
  updatedAt?: Timestamp;
}
