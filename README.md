# Final Say

A personal legacy planning platform. Document your final wishes, messages, funeral arrangements, and digital assets — encrypted end-to-end — for the people you trust.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Auth & Database:** Firebase Auth + Firestore
- **Encryption:** AES-256 client-side (CryptoJS), key derived from UID + server pepper
- **Payments:** Stripe (subscription plans + billing portal)
- **Email:** Resend
- **Styling:** Tailwind CSS (custom design system)
- **UI:** Lucide icons, custom component library

## Features

- 7 core modules: Profile, Funeral Arrangements, Digital Vault, Final Messages, Trustees, Pets & Dependants, Life Philosophy
- End-to-end encryption on all sensitive data
- Trustee invitation & unlock confirmation flow
- Stripe subscription management
- PWA-ready with manifest
- GDPR data export
- Legal pages (privacy policy, terms of service)

## Getting Started

1. Copy `.env.example` to `.env.local` and fill in all values.

2. Install dependencies:
```bash
npm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
