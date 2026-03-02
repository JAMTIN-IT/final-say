import Stripe from "stripe";

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export const PLANS = {
  essential: {
    name: "Essential",
    priceUSD: 100,
    priceZAR: 2000,
    description: "Full platform access, 1 trustee",
    features: [
      "Full platform access",
      "1 trustee",
      "Auto-save across all modules",
      "Secure encrypted vault",
    ],
    maxTrustees: 1,
    fileUploads: false,
    stripePriceId: process.env.STRIPE_ESSENTIAL_PRICE_ID || "",
  },
  legacy: {
    name: "Legacy",
    priceUSD: 300,
    priceZAR: 6000,
    description: "Full access, up to 5 trustees, encrypted file uploads",
    features: [
      "Everything in Essential",
      "Up to 5 trustees",
      "Encrypted file uploads",
      "Media attachments in messages",
    ],
    maxTrustees: 5,
    fileUploads: true,
    stripePriceId: process.env.STRIPE_LEGACY_PRICE_ID || "",
  },
  family: {
    name: "Family",
    priceUSD: 500,
    priceZAR: 10000,
    description: "All above + family member sub-profiles, priority unlock support",
    features: [
      "Everything in Legacy",
      "Unlimited trustees",
      "Family member sub-profiles",
      "Priority unlock support",
    ],
    maxTrustees: Infinity,
    fileUploads: true,
    stripePriceId: process.env.STRIPE_FAMILY_PRICE_ID || "",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
