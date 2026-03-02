# Final Say — System Architecture Blueprint

> **Version:** 1.0  
> **Date:** March 2026  
> **Classification:** Internal Design Document

---

## 1. Project Overview

**Final Say** is a subscription-based SaaS platform that enables individuals to securely capture, manage, and time-lock their end-of-life wishes, funeral arrangements, digital account credentials, and personal final messages. Upon a verified passing, designated trustees gain controlled access to the information, empowering the family to honour the person's last requests with clarity and dignity.

### 1.1 Core Value Proposition

- **For the user:** Peace of mind knowing their wishes are captured, secure, and will be honoured.
- **For the family:** A single source of truth — no guesswork, no conflicts, no scrambling.
- **For the world:** A compassionate digital product that normalises end-of-life planning.

### 1.2 Monetisation

| Plan | Price (USD) | Price (ZAR approx.) | Details |
|------|-------------|----------------------|---------|
| Essential | $1.00 / month | R20 / month | Full platform access, 1 trustee |
| Legacy | $3.00 / month | R60 / month | Full access, up to 5 trustees, encrypted file uploads |
| Family | $5.00 / month | R100 / month | All above + family member sub-profiles, priority unlock support |

> Billing in ZAR rounded up to nearest R5 increment. Stripe handles currency conversion. Accounts auto-suspend (data retained 12 months) after 3 failed billing cycles before permanent deletion notice is sent to trustees.

---

## 2. Information Architecture — Data Collection Points

This is the canonical list of all data the platform collects, grouped by module. This drives the questionnaire flow.

---

### MODULE 1 — Identity & Profile

| Field | Type | Notes |
|-------|------|-------|
| Full legal name | Text | |
| Known as / preferred name | Text | |
| Date of birth | Date | |
| ID / Passport number | Text | Encrypted at rest |
| Nationality | Select | |
| Country of residence | Select | |
| Profile photo | Image upload | |
| Brief life summary / bio | Long text | For obituary use |

---

### MODULE 2 — Funeral & Service Arrangements

#### 2.1 Body Disposition

| Field | Type | Options / Notes |
|-------|------|-----------------|
| Disposition type | Select | Burial / Cremation / Green burial / Donation to science / Aquamation / Mummification |
| Preferred funeral home | Text + URL | Named preference |
| Religious or cultural tradition | Select + custom | Christian, Jewish, Muslim, Hindu, Secular, Custom |
| Type of service | Multi-select | Traditional funeral, Memorial service, Celebration of life, Graveside only, No service |
| Service location preference | Text | Church, home, venue name, graveside |
| Preferred date/timing guidance | Text | e.g., "within one week", "no rush" |

#### 2.2 Burial Preferences

| Field | Type | Notes |
|-------|------|-------|
| Burial location | Text | Cemetery name, plot reference, GPS coords |
| Casket preference | Text + image upload | Material, colour, style |
| Clothing to be buried in | Text + image upload | Specific outfit, or general guidance |
| Jewellery to be buried with | Text | Keep or remove specific items |
| Embalming preference | Select | Yes / No / No preference |

#### 2.3 Cremation Preferences

| Field | Type | Notes |
|-------|------|-------|
| Urn preference | Text + image upload | Style, material |
| Ash disposition | Multi-select + text | Scatter at location, kept at home, buried, divided between family |
| Scatter location | Text | GPS / description |

#### 2.4 The Service

| Field | Type | Notes |
|-------|------|-------|
| Music / songs to be played | Repeatable text | Entry + (Spotify link optional), moment (entrance/exit/during) |
| Music NOT to be played | Text | |
| Eulogy — who should deliver it | Text | Name + relationship |
| Eulogy — notes for the speaker | Long text | Stories, themes, tone guidance |
| Readings / poems / scripture | Repeatable text | Title, author, full text or source |
| Flowers | Text | Preferred type, colour, style, or "no flowers please" |
| Flowers NOT wanted | Text | |
| Dress code for attendees | Text | e.g., "Wear colour, no black" |
| Photo/video slideshow guidance | Long text | Albums, eras, tone |
| Order of service preferences | Long text | Outline of how the service should flow |
| Catering / wake / reception | Text | Location, food preferences, drinks, tone |
| Charitable donations in lieu of | Text | Organisation name + link |
| Things you do NOT want | Long text | Specific prohibitions |
| Obituary draft | Long text | Self-written or notes for family |

---

### MODULE 3 — Digital Legacy & Account Management

#### 3.1 Digital Account Inventory

Repeatable records, one per account:

| Field | Type | Notes |
|-------|------|-------|
| Platform / service name | Text | e.g., Facebook, Gmail, Netflix |
| Category | Select | Social media, Email, Financial, Streaming, Gaming, Work, Other |
| Username / email | Text | Encrypted |
| Password | Text | AES-256 encrypted, never displayed in plain text until unlock |
| 2FA backup codes | Text | Encrypted |
| Instruction on death | Select | Delete / Memorialize / Transfer to trustee / Keep active |
| Nominated trustee for this account | Select from trustees list | |
| Notes | Text | Any additional context |

#### 3.2 Device Access

| Field | Type | Notes |
|-------|------|-------|
| Device type | Text | Phone, laptop, tablet |
| PIN / passcode | Text | Encrypted |
| Location of device | Text | |

#### 3.3 Financial & Legal Pointers

| Field | Type | Notes |
|-------|------|-------|
| Bank name | Text | |
| Account type | Text | |
| Where to find will / testament | Text | Location, attorney name + contact |
| Insurance policies | Repeatable | Provider, policy number, contact |
| Investment / retirement accounts | Text | |
| Crypto wallets | Text + encrypted key field | Seed phrase stored encrypted |
| Safe / safety deposit box | Text | Location + combination / key location |
| Outstanding debts to be aware of | Long text | |

---

### MODULE 4 — People & Trustees

#### 4.1 Trustee Designation

Repeatable records per trustee (max per plan):

| Field | Type | Notes |
|-------|------|-------|
| Full name | Text | |
| Relationship | Select + custom | Spouse, Child, Sibling, Friend, Attorney, etc. |
| Email address | Text | Used to notify and grant access |
| Phone number | Text | |
| Role | Multi-select | Funeral coordinator, Digital executor, Financial executor, Emotional support contact |
| Access level | Select | Full access / Funeral section only / Digital accounts only / Messages only |
| Unlock confirmation required | Toggle | Trustee must confirm passing before access granted |

#### 4.2 Important Contacts

| Field | Type | Notes |
|-------|------|-------|
| Attorney | Text + phone | |
| Financial advisor | Text + phone | |
| Doctor / GP | Text + phone | |
| Employer / HR contact | Text + phone | |
| Religious leader | Text + phone | |
| Funeral home contact | Text + phone | |

---

### MODULE 5 — Final Messages (Hard Truths)

This is the most emotionally significant module. Each message is a separate, named record.

| Field | Type | Notes |
|-------|------|-------|
| Message recipient | Text | Name of person |
| Message title / subject | Text | e.g., "For my daughter, Emma" |
| Message body | Rich text / Long text | Unfiltered, personal, honest |
| Tone tag | Select | Loving / Honest / Instructional / Revelatory / Apologetic / Celebratory |
| Media attachments | File upload | Voice note, video, image |
| Delivery timing | Select | Immediately on unlock / 30 days after unlock / On specific date / Never (archive only) |
| Access restriction | Select | Specific trustee only / All trustees / All trustees + named person |
| Visibility to author | Toggle | Can re-read and edit until account is locked |

---

### MODULE 6 — Pets & Dependants

| Field | Type | Notes |
|-------|------|-------|
| Dependant name | Text | |
| Type | Select | Minor child, Adult dependent, Pet |
| Nominated guardian | Text + email | |
| Care instructions | Long text | Routine, diet, vet contacts, school info |
| Funding source for care | Text | |

---

### MODULE 7 — Life Philosophy & Legacy Wishes

| Field | Type | Notes |
|-------|------|-------|
| How you want to be remembered | Long text | |
| Values to pass on | Long text | |
| Regrets you want to name | Long text | |
| Proudest achievements | Long text | |
| Unfinished business / wishes | Long text | |
| Letter to the world | Long text | Public or private |
| Advice for those left behind | Long text | |

---

## 3. System Architecture

### 3.1 High-Level Stack

```
Frontend:          Next.js 14 (App Router) + TypeScript
Styling:           TailwindCSS + shadcn/ui
Auth:              Firebase Authentication (email/password + Google OAuth)
Database:          Firebase Firestore (NoSQL, real-time)
File Storage:      Firebase Storage (encrypted uploads)
Encryption:        AES-256 via client-side encryption before Firestore write
Payments:          Stripe (subscriptions, ZAR + USD support)
Email:             Resend (transactional email)
Hosting:           Vercel (Next.js optimised)
Secrets:           Vercel Environment Variables
```

### 3.2 Architecture Diagram (Conceptual)

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  Next.js App (SSR + CSR)                                    │
│  ┌───────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │  Auth UI  │  │ Questionnaire │  │  Dashboard / Vault   │ │
│  └─────┬─────┘  └──────┬───────┘  └──────────┬───────────┘ │
└────────┼───────────────┼──────────────────────┼─────────────┘
         │               │                      │
         ▼               ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    FIREBASE LAYER                            │
│  ┌─────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │Firebase Auth│  │   Firestore DB   │  │Firebase Storage│ │
│  │             │  │  (encrypted docs)│  │ (files/media)  │ │
│  └─────────────┘  └──────────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│               NEXT.JS API ROUTES (Server)                    │
│  /api/stripe-webhook   /api/unlock-request   /api/notify    │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────┐    ┌─────────────────────┐
│   Stripe Payments   │    │    Resend Email      │
│  (subscriptions)    │    │  (notifications)     │
└─────────────────────┘    └─────────────────────┘
```

### 3.3 Firestore Data Model

```
/users/{userId}
  - email
  - displayName
  - createdAt
  - subscriptionStatus: active | suspended | cancelled
  - planTier: essential | legacy | family
  - stripeCustomerId
  - isLocked: boolean  // true = account unlocked by trustees

/users/{userId}/profile/{profileId}
  - All MODULE 1 fields

/users/{userId}/funeralArrangements/{docId}
  - All MODULE 2 fields (subdivided by section)

/users/{userId}/digitalAccounts/{accountId}
  - All MODULE 3 fields (passwords AES-256 encrypted)

/users/{userId}/trustees/{trusteeId}
  - All MODULE 4 fields
  - status: invited | confirmed | active

/users/{userId}/finalMessages/{messageId}
  - All MODULE 5 fields (body encrypted)
  - isDelivered: boolean

/users/{userId}/dependants/{dependantId}
  - All MODULE 6 fields

/users/{userId}/lifePhilosophy/{docId}
  - All MODULE 7 fields

/unlockRequests/{requestId}
  - userId
  - requestedBy: trusteeId
  - requestedAt
  - confirmations: [trusteeId, ...]
  - status: pending | approved | rejected
  - requiredConfirmations: number
```

### 3.4 Security Model

**Encryption:**
- All sensitive fields (passwords, 2FA codes, message bodies, ID numbers) are encrypted client-side using AES-256 before being written to Firestore.
- The encryption key is derived from the user's Firebase UID + a server-side pepper stored in Vercel secrets.
- Trustees never receive raw decryption keys — decryption happens server-side only after unlock conditions are met.

**Firestore Security Rules:**
- Users can only read/write their own documents.
- Trustee access to a user's documents is only granted after an `unlockRequest` document reaches `approved` status.
- All unlock requests require a minimum of 1 trustee confirmation (Essential plan) or 2 trustees (Legacy/Family plans).

**Unlock Flow:**
1. Trustee visits platform and submits an unlock request with death verification (death certificate upload or statutory declaration).
2. Required number of other trustees confirm via email link.
3. Platform admin (or automated rule) reviews and approves after 48-hour hold period.
4. Firestore security rules updated via Cloud Function to grant trustee read access.
5. Final messages delivered according to their configured timing rules.

---

## 4. User Journey & Questionnaire Flow

### 4.1 Onboarding Flow

```
Landing Page
    │
    ▼
Sign Up (Firebase Auth)
    │
    ▼
Plan Selection + Stripe Checkout
    │
    ▼
Welcome + "Your Final Say Begins" onboarding screen
    │
    ▼
Questionnaire: Module-by-module guided flow
  [Progress bar: 7 modules, completeness shown as % per module]
    │
    ▼
Dashboard (overview of all sections with completion status)
```

### 4.2 Questionnaire UX Principles

- **Non-linear:** Users can jump to any module at any time. No forced linear path after initial onboarding.
- **Auto-save:** Every field saves automatically on blur/change. No "Submit" button required per section.
- **Progress gamification (gentle):** Completion percentage per module shown on dashboard. No aggressive nudges.
- **Resumable:** Users can exit at any point and return to exactly where they left off.
- **Edit anytime:** All fields remain editable forever while the account is active.
- **Sensitive prompts:** Emotionally difficult sections (Final Messages) are gated behind a soft confirmation: "You're about to enter the Final Messages section. Take your time."

### 4.3 Trustee Invitation Flow

1. User adds trustee details in MODULE 4.
2. Platform sends invitation email to trustee via Resend.
3. Trustee creates a free (read-only) Trustee Account.
4. Trustee sees a pending status — no content visible.
5. Upon unlock approval, trustee gains scoped access per their role.

---

## 5. Key Screens

| Screen | Description |
|--------|-------------|
| Landing / Marketing | Emotional, minimal hero. Value prop. Pricing. |
| Sign Up / Sign In | Firebase Auth UI, clean |
| Plan Selection | 3-tier card layout, Stripe Checkout |
| Welcome / Onboarding | "Your Final Say" narrative intro, module overview |
| Dashboard | Card grid showing all 7 modules with % completion |
| Module: Profile | Simple form, profile photo |
| Module: Funeral Arrangements | Multi-step sub-sections with contextual help |
| Module: Digital Vault | Table-style account list, masked passwords |
| Module: Final Messages | Card-per-message, rich text editor, recipient tagging |
| Module: Trustees | Contact card layout, role assignment |
| Module: Life Philosophy | Long-form journaling interface |
| Settings | Account, billing, subscription, danger zone |
| Trustee Portal | Separate locked view for trustees post-unlock |
| Unlock Request Flow | Step-by-step guided process for trustees |

---

## 6. Non-Functional Requirements

| Requirement | Detail |
|-------------|--------|
| **Data Retention** | User data retained 12 months after subscription lapse before deletion warning |
| **GDPR / POPIA Compliance** | Right to erasure, data export, explicit consent capture |
| **Uptime** | 99.9% SLA target via Vercel + Firebase |
| **Mobile Responsive** | Full mobile-first design, PWA-capable |
| **Accessibility** | WCAG 2.1 AA minimum |
| **Localisation** | English (primary), ZAR pricing, SAST timezone support |
| **Backup** | Firestore daily automated backups, point-in-time recovery |
| **Audit Log** | All unlock requests and trustee actions logged immutably |

---

## 7. Third-Party Integrations

| Service | Purpose | Notes |
|---------|---------|-------|
| Firebase Auth | Authentication | Email/password, Google OAuth |
| Firebase Firestore | Primary database | |
| Firebase Storage | File/media uploads | |
| Stripe | Subscription billing | USD + ZAR, webhook-driven |
| Resend | Transactional email | Invites, unlock notifications, billing alerts |
| Vercel | Hosting + edge functions | |
| Sentry | Error monitoring | |

---

## 8. Implementation Phases

### Phase 1 — Foundation (Weeks 1–3)
- Project scaffold (Next.js + Tailwind + Firebase)
- Authentication (sign up, sign in, sign out, Google OAuth)
- Stripe subscription integration + plan selection
- Firestore data model setup + security rules
- Basic dashboard shell

### Phase 2 — Core Modules (Weeks 4–7)
- MODULE 1: Profile
- MODULE 2: Funeral Arrangements (all sub-sections)
- MODULE 3: Digital Vault (with client-side encryption)
- Auto-save mechanism across all forms

### Phase 3 — People & Messages (Weeks 8–10)
- MODULE 4: Trustees + invitation email flow
- MODULE 5: Final Messages (rich text, media upload)
- MODULE 6: Pets & Dependants
- MODULE 7: Life Philosophy

### Phase 4 — Unlock & Security (Weeks 11–13)
- Trustee portal
- Unlock request flow + admin review
- Death certificate upload
- Message delivery rules (timing logic via Cloud Functions)
- Security audit + encryption review

### Phase 5 — Polish & Launch (Weeks 14–16)
- GDPR / POPIA compliance (consent, export, erasure)
- Mobile optimisation + PWA manifest
- Accessibility audit
- Marketing landing page
- Beta testing + onboarding refinement
- Production launch

---

## 9. Legal & Ethical Considerations

- **Terms of Service** must clearly state this platform is not a legal will replacement.
- **Disclaimer** on all credential/password storage: platform is not liable for account access issues post-mortem.
- **Death verification** is honour-based + document upload (not legally verified by platform).
- **Minor protection:** Final Messages to minors should have trustee-mediated delivery.
- **Data sovereignty:** User data stored in Firebase region closest to primary user base (europe-west for ZAR market).
- **Account abandonment:** After 2 years of inactivity, trustees are notified before any deletion.

---

*End of Blueprint — Final Say v1.0*
