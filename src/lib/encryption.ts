import CryptoJS from "crypto-js";

function getDerivedKey(uid: string): string {
  const pepper = process.env.NEXT_PUBLIC_ENCRYPTION_PEPPER || "final-say-default-pepper";
  return CryptoJS.SHA256(`${uid}:${pepper}`).toString();
}

export function encryptField(value: string, uid: string): string {
  if (!value) return "";
  const key = getDerivedKey(uid);
  return CryptoJS.AES.encrypt(value, key).toString();
}

export function decryptField(encrypted: string, uid: string): string {
  if (!encrypted) return "";
  try {
    const key = getDerivedKey(uid);
    const bytes = CryptoJS.AES.decrypt(encrypted, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
}

export const encrypt = encryptField;
export const decrypt = decryptField;

export const ENCRYPTED_FIELDS = {
  profile: ["idNumber"],
  digitalAccounts: ["username", "password", "twoFaCodes"],
  devices: ["pin"],
  financial: ["cryptoSeed"],
  messages: ["body"],
} as const;
