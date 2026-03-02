import { Timestamp } from "firebase/firestore";

export type ToneTag =
  | "loving"
  | "honest"
  | "instructional"
  | "revelatory"
  | "apologetic"
  | "celebratory"
  | "love";

export type DeliveryTiming =
  | "immediately"
  | "30_days_after"
  | "specific_date"
  | "archive_only";

export type MessageAccess =
  | "specific_trustee"
  | "all_trustees"
  | "all_trustees_and_named";

export interface FinalMessage {
  id?: string;
  recipient?: string;
  recipientName: string;
  recipientEmail: string;
  title?: string;
  subject: string;
  body: string;
  toneTag: ToneTag | "";
  mediaUrls: string[];
  deliveryTiming?: DeliveryTiming | "";
  deliverOn: string;
  specificDeliveryDate?: string;
  accessRestriction?: MessageAccess | "";
  accessLevel: string;
  specificTrusteeId?: string;
  namedPerson?: string;
  visibleToAuthor?: boolean;
  isDelivered?: boolean;
  isEncrypted: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const TONE_TAG_STYLES: Record<ToneTag, { bg: string; text: string; label: string }> = {
  loving: { bg: "#F5E6E8", text: "#8B3A52", label: "Loving" },
  love: { bg: "#F5E6E8", text: "#8B3A52", label: "Love" },
  honest: { bg: "#F5EDD6", text: "#7A5A1E", label: "Honest" },
  instructional: { bg: "#E6EEF5", text: "#1E4A7A", label: "Instructional" },
  revelatory: { bg: "#EDE6F5", text: "#4A1E7A", label: "Revelatory" },
  apologetic: { bg: "#EDEAE6", text: "#5A4A3A", label: "Apologetic" },
  celebratory: { bg: "#E6F5EE", text: "#1E7A4A", label: "Celebratory" },
};
