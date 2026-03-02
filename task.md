# Final Say — Master Implementation Task List

> Generated from blueprint.md + style.md  
> Every task must be completed. No placeholders, no TODOs, no stubs.

---

## PHASE 0 — Project Scaffold

- [x] 0.1 Initialise Next.js 14 App Router project with TypeScript
- [x] 0.2 Install and configure TailwindCSS
- [x] 0.3 Extend tailwind.config.js with full Final Say design tokens (colours, fonts, radii, shadows, durations)
- [x] 0.4 Install shadcn/ui and initialise with custom theme
- [x] 0.5 Install dependencies: lucide-react, firebase, stripe, @stripe/stripe-js, resend, react-hook-form, zod, @hookform/resolvers, crypto-js, react-quill / tiptap, date-fns
- [x] 0.6 Set up globals.css with all CSS custom properties (colour tokens, easing, duration variables)
- [x] 0.7 Load Google Fonts: Cormorant Garamond, Inter, JetBrains Mono via next/font or link tag in layout
- [x] 0.8 Configure .env.local with all required secrets (Firebase, Stripe, Resend, encryption pepper)
- [x] 0.9 Set up path aliases in tsconfig.json (@/components, @/lib, @/hooks, @/types)
- [x] 0.10 Create project folder structure: app/, components/, lib/, hooks/, types/, public/

---

## PHASE 1 — Firebase & Auth Foundation

- [x] 1.1 Create lib/firebase.ts — initialise Firebase app, Auth, Firestore, Storage
- [x] 1.2 Create lib/auth.ts — signUp, signIn, signOut, googleSignIn helper functions
- [x] 1.3 Create lib/firestore.ts — typed CRUD helpers for each collection
- [x] 1.4 Create Firestore security rules (firestore.rules) matching blueprint section 3.4
- [x] 1.5 Create Firebase Storage security rules (storage.rules)
- [x] 1.6 Create AuthContext (context/AuthContext.tsx) — provider wrapping app, exposes user, loading, plan
- [x] 1.7 Create useAuth hook (hooks/useAuth.ts)
- [x] 1.8 Create middleware.ts for route protection — redirect unauthenticated users from /dashboard/* to /sign-in

---

## PHASE 2 — Stripe & Subscription

- [x] 2.1 Create Stripe products/prices in lib/stripe.ts (Essential $1, Legacy $3, Family $5)
- [x] 2.2 Create API route: app/api/stripe/create-checkout-session/route.ts
- [x] 2.3 Create API route: app/api/stripe/webhook/route.ts — handle checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
- [x] 2.4 Create API route: app/api/stripe/portal/route.ts — customer billing portal session
- [x] 2.5 Write Stripe webhook logic: update Firestore user doc subscriptionStatus and planTier on events
- [x] 2.6 Create types/subscription.ts — PlanTier, SubscriptionStatus types

---

## PHASE 3 — Encryption Layer

- [x] 3.1 Create lib/encryption.ts — AES-256 encrypt/decrypt using crypto-js
- [x] 3.2 Derive encryption key from Firebase UID + server-side pepper (env var)
- [x] 3.3 Export encryptField(value, uid) and decryptField(encrypted, uid) functions
- [x] 3.4 Identify all fields requiring encryption: passwords, 2FA codes, message bodies, ID numbers, PIN codes, crypto seeds

---

## PHASE 4 — Type System

- [x] 4.1 Create types/user.ts — UserDoc, UserProfile
- [x] 4.2 Create types/funeral.ts — FuneralArrangements, BodyDisposition, BurialPrefs, CremationPrefs, ServiceDetails
- [x] 4.3 Create types/digital.ts — DigitalAccount, DeviceAccess, FinancialPointers
- [x] 4.4 Create types/trustees.ts — Trustee, ImportantContact, AccessLevel, TrusteeRole
- [x] 4.5 Create types/messages.ts — FinalMessage, ToneTag, DeliveryTiming
- [x] 4.6 Create types/dependants.ts — Dependant, DependantType
- [x] 4.7 Create types/philosophy.ts — LifePhilosophy
- [x] 4.8 Create types/unlock.ts — UnlockRequest, UnlockStatus

---

## PHASE 5 — Global Layout & Navigation

- [x] 5.1 Create app/layout.tsx — root layout with fonts, AuthProvider, metadata
- [x] 5.2 Create app/(marketing)/layout.tsx — marketing shell (no sidebar)
- [x] 5.3 Create app/(app)/layout.tsx — authenticated app shell with sidebar + topnav
- [x] 5.4 Create components/layout/TopNav.tsx — 64px, logo, nav links, account dropdown
- [x] 5.5 Create components/layout/Sidebar.tsx — dusk background, 7 module links with icons, active state, settings link
- [x] 5.6 Create components/layout/MobileNav.tsx — bottom navigation bar (5 icons), sidebar as bottom sheet
- [x] 5.7 Create components/layout/PageTransition.tsx — fade + translateY animation wrapper
- [x] 5.8 Create public/favicon.svg — ember feather/candle mark on dusk background

---

## PHASE 6 — Design System Components

- [x] 6.1 Create components/ui/Button.tsx — Primary, Secondary, Ghost, Destructive variants with focus ring
- [x] 6.2 Create components/ui/Input.tsx — text input with focus/error/success/disabled states
- [x] 6.3 Create components/ui/Textarea.tsx — vertical resize, min-height 120px
- [x] 6.4 Create components/ui/Select.tsx — custom arrow, options panel shadow
- [x] 6.5 Create components/ui/Toggle.tsx — sage on, stone-300 off, 44×24px
- [x] 6.6 Create components/ui/Checkbox.tsx — 18×18px, dusk checked state
- [x] 6.7 Create components/ui/Label.tsx — Inter 500 13px, letter-spacing
- [x] 6.8 Create components/ui/HelperText.tsx — stone-500 13px
- [x] 6.9 Create components/ui/ErrorText.tsx — danger colour, warning icon
- [x] 6.10 Create components/ui/Card.tsx — Module card (parchment), Content card (white), Message card (ember left border)
- [x] 6.11 Create components/ui/Badge.tsx — Complete/InProgress/NotStarted variants + Tone tags
- [x] 6.12 Create components/ui/Modal.tsx — overlay blur, scale animation, focus trap, ESC close
- [x] 6.13 Create components/ui/SensitiveModal.tsx — ember left border, parchment bg, "I'm not ready yet" exit
- [x] 6.14 Create components/ui/AlertBox.tsx — info box with info-colour border/bg
- [x] 6.15 Create components/ui/ProgressRing.tsx — SVG circle, 48px, sage stroke, percentage text
- [x] 6.16 Create components/ui/ProgressBar.tsx — 4px, ember→sage gradient, animated fill
- [x] 6.17 Create components/ui/StepIndicator.tsx — circles 28px, incomplete/current/complete states, connector lines
- [x] 6.18 Create components/ui/AutoSaveIndicator.tsx — "✓ Saved quietly", fade in/out, 800ms debounce
- [x] 6.19 Create components/ui/EmptyState.tsx — 48px icon, Cormorant heading, Inter body, CTA slot

---

## PHASE 7 — Marketing / Landing Page

- [x] 7.1 Create app/(marketing)/page.tsx — landing page root
- [x] 7.2 Create components/marketing/Hero.tsx — dark gradient bg, "Leave nothing unsaid." display heading, sub-headline, two CTAs (Get started / See how it works)
- [x] 7.3 Create components/marketing/ValueProps.tsx — 3 columns: For you / For your family / For the world
- [x] 7.4 Create components/marketing/HowItWorks.tsx — 3-step numbered section
- [x] 7.5 Create components/marketing/Pricing.tsx — 3-tier cards (Essential/Legacy/Family), price display, feature list, Stripe CTA
- [x] 7.6 Create components/marketing/Testimonials.tsx — 3 quote cards (placeholder content)
- [x] 7.7 Create components/marketing/Footer.tsx — logo, tagline, links (Terms, Privacy, Contact), copyright
- [x] 7.8 Create app/(marketing)/terms/page.tsx — Terms of Service (platform not legal will, credential disclaimer)
- [x] 7.9 Create app/(marketing)/privacy/page.tsx — Privacy Policy (GDPR/POPIA, data export, erasure)

---

## PHASE 8 — Authentication Screens

- [x] 8.1 Create app/(auth)/sign-up/page.tsx — email/password sign up + Google OAuth button
- [x] 8.2 Create app/(auth)/sign-in/page.tsx — email/password sign in + Google OAuth button
- [x] 8.3 Create app/(auth)/forgot-password/page.tsx — email input, Firebase sendPasswordResetEmail
- [x] 8.4 Create components/auth/AuthForm.tsx — shared form wrapper (narrow 480px column)
- [x] 8.5 Create components/auth/GoogleButton.tsx — Google branded button
- [x] 8.6 Create app/(auth)/layout.tsx — centred layout, no sidebar

---

## PHASE 9 — Plan Selection & Onboarding

- [x] 9.1 Create app/(app)/plan/page.tsx — 3-tier plan selection cards, triggers Stripe checkout
- [x] 9.2 Create app/(app)/welcome/page.tsx — "This is your Final Say." narrative onboarding, module overview list
- [x] 9.3 Create app/(app)/onboarding/page.tsx — redirect logic: if no plan → /plan, if no profile → /welcome, else /dashboard

---

## PHASE 10 — Dashboard

- [x] 10.1 Create app/(app)/dashboard/page.tsx — greeting, overall progress bar, 3-column module card grid
- [x] 10.2 Create components/dashboard/ModuleCard.tsx — icon, title, completion ring (%), badge, "Continue" link
- [x] 10.3 Create components/dashboard/OverallProgress.tsx — linear progress bar, "X% complete" label
- [x] 10.4 Create hooks/useModuleProgress.ts — calculates per-module and overall completion percentage from Firestore data

---

## PHASE 11 — MODULE 1: Identity & Profile

- [x] 11.1 Create app/(app)/dashboard/profile/page.tsx
- [x] 11.2 Create components/modules/profile/ProfileForm.tsx — all MODULE 1 fields with conversational prompts
  - Full legal name, preferred name, DOB, ID/Passport (encrypted), nationality (select), country (select), profile photo upload, bio (textarea)
- [x] 11.3 Implement profile photo upload to Firebase Storage
- [x] 11.4 Wire auto-save: debounce 800ms on field change, write to /users/{uid}/profile/{profileId}
- [x] 11.5 Display AutoSaveIndicator on save

---

## PHASE 12 — MODULE 2: Funeral Arrangements

- [x] 12.1 Create app/(app)/dashboard/funeral/page.tsx — multi-section layout with step indicator
- [x] 12.2 Create components/modules/funeral/BodyDispositionForm.tsx — disposition type select, funeral home, religious tradition, service type (multi-select), location, date guidance
- [x] 12.3 Create components/modules/funeral/BurialPrefsForm.tsx — burial location, casket (text + image), clothing (text + image), jewellery, embalming
- [x] 12.4 Create components/modules/funeral/CremationPrefsForm.tsx — urn (text + image), ash disposition (multi-select), scatter location
- [x] 12.5 Create components/modules/funeral/ServiceDetailsForm.tsx — music list (repeatable, with moment selector), music not wanted, eulogy speaker, eulogy notes, readings (repeatable), flowers, flowers not wanted, dress code, slideshow guidance, order of service, catering, charity donations, prohibitions, obituary draft
- [x] 12.6 Implement repeatable field component (components/ui/RepeatableField.tsx) — add/remove rows
- [x] 12.7 Wire all sub-sections to auto-save to /users/{uid}/funeralArrangements/{docId}
- [x] 12.8 Image uploads for casket/clothing/urn go to Firebase Storage

---

## PHASE 13 — MODULE 3: Digital Vault

- [x] 13.1 Create app/(app)/dashboard/vault/page.tsx — table-style account list
- [x] 13.2 Create components/modules/vault/AccountList.tsx — table with masked password column, category badge, action buttons
- [x] 13.3 Create components/modules/vault/AccountForm.tsx — platform name, category select, username (encrypted), password (encrypted, masked input with show/hide toggle), 2FA codes (encrypted), instruction on death select, trustee assignment, notes
- [x] 13.4 Create components/modules/vault/DeviceForm.tsx — device type, PIN (encrypted), location
- [x] 13.5 Create components/modules/vault/FinancialForm.tsx — bank, account type, will location, insurance policies (repeatable), investments, crypto (encrypted seed), safe/deposit box, debts
- [x] 13.6 All sensitive vault fields encrypted via encryptField() before Firestore write
- [x] 13.7 Passwords displayed as ●●●●●●●● with JetBrains Mono, reveal on authenticated action

---

## PHASE 14 — MODULE 4: People & Trustees

- [x] 14.1 Create app/(app)/dashboard/trustees/page.tsx — contact card grid
- [x] 14.2 Create components/modules/trustees/TrusteeCard.tsx — name, relationship, role badges, access level, status badge (invited/confirmed/active)
- [x] 14.3 Create components/modules/trustees/TrusteeForm.tsx — all MODULE 4.1 fields, role multi-select, access level select, unlock confirmation toggle
- [x] 14.4 Create components/modules/trustees/ContactsForm.tsx — MODULE 4.2 important contacts (attorney, financial advisor, doctor, employer, religious leader, funeral home)
- [x] 14.5 Create API route: app/api/trustees/invite/route.ts — sends invitation email via Resend
- [x] 14.6 Create Resend email template: trustee invitation — subject "[Name] has named you as someone they trust."
- [x] 14.7 Enforce plan-based trustee limits: Essential=1, Legacy=5, Family=unlimited
- [x] 14.8 Create app/(trustee)/page.tsx — trustee landing page (read-only, locked pending unlock)

---

## PHASE 15 — MODULE 5: Final Messages

- [x] 15.1 Create app/(app)/dashboard/messages/page.tsx — card-per-message list + "Write a message" CTA
- [x] 15.2 Gate entry with SensitiveModal — "You're about to enter the most personal part of Final Say."
- [x] 15.3 Create components/modules/messages/MessageCard.tsx — ember left border card, recipient, title, tone tag, delivery timing badge, edit/delete actions
- [x] 15.4 Create components/modules/messages/MessageForm.tsx — recipient name, title, rich text body (TipTap editor), tone tag select (with colour preview), media upload, delivery timing select, access restriction select, visibility toggle
- [x] 15.5 Encrypt message body with encryptField() before Firestore write
- [x] 15.6 Media attachments (voice note, video, image) upload to Firebase Storage
- [x] 15.7 Apply Legacy/Family plan gate for file uploads (Essential plan: no file attachments)

---

## PHASE 16 — MODULE 6: Pets & Dependants

- [x] 16.1 Create app/(app)/dashboard/dependants/page.tsx
- [x] 16.2 Create components/modules/dependants/DependantForm.tsx — name, type select (Minor child / Adult dependent / Pet), guardian (text + email), care instructions, funding source
- [x] 16.3 Card layout per dependant, edit/delete actions

---

## PHASE 17 — MODULE 7: Life Philosophy

- [x] 17.1 Create app/(app)/dashboard/philosophy/page.tsx — long-form journaling interface
- [x] 17.2 Create components/modules/philosophy/PhilosophyForm.tsx — 7 long-text fields with conversational prompts:
  - How you want to be remembered, Values to pass on, Regrets, Proudest achievements, Unfinished business, Letter to the world (public/private toggle), Advice for those left behind
- [x] 17.3 Auto-save all fields to /users/{uid}/lifePhilosophy/{docId}

---

## PHASE 18 — Unlock Request Flow

- [x] 18.1 Create app/(trustee)/unlock/page.tsx — step-by-step unlock request UI
- [x] 18.2 Create components/unlock/UnlockSteps.tsx — StepIndicator driven flow (4 steps)
- [x] 18.3 Step 1: Trustee identity confirmation (email match)
- [x] 18.4 Step 2: Death verification — death certificate upload to Firebase Storage
- [x] 18.5 Step 3: Request submitted → Firestore /unlockRequests/{requestId} created with status: pending
- [x] 18.6 Step 4: Confirmation screen — "We're deeply sorry for your loss. We'll guide you through this carefully."
- [x] 18.7 Create API route: app/api/unlock-request/route.ts — validates request, notifies other trustees via Resend, starts 48hr hold timer
- [x] 18.8 Create API route: app/api/unlock-confirm/route.ts — trustee confirmation via email link, updates confirmations array
- [x] 18.9 Create Resend email template: unlock notification to other trustees
- [x] 18.10 Create Resend email template: unlock approved — notifies all trustees of access grant
- [x] 18.11 Trustee confirmation count logic: Essential=1, Legacy/Family=2 required
- [x] 18.12 After approval: Firestore user doc isLocked=true, trustee access scoped per access level

---

## PHASE 19 — Trustee Portal

- [x] 19.1 Create app/(trustee)/portal/page.tsx — post-unlock dashboard for trustees
- [x] 19.2 Scope content visibility based on trustee's access level (Full / Funeral only / Digital only / Messages only)
- [x] 19.3 Show funeral arrangements section to trustees with funeral access
- [x] 19.4 Show digital vault (decrypted server-side) to trustees with digital access
- [x] 19.5 Deliver final messages per their timing rules (immediate / 30 day / specific date)
- [x] 19.6 Create components/trustee/TrusteePortalNav.tsx — minimal nav for trustee view
- [x] 19.7 Log all trustee portal access events to immutable audit log in Firestore

---

## PHASE 20 — Settings & Account Management

- [x] 20.1 Create app/(app)/settings/page.tsx — tabbed settings: Account, Billing, Privacy, Danger Zone
- [x] 20.2 Account tab: update display name, email, password change
- [x] 20.3 Billing tab: current plan display, upgrade/downgrade via Stripe portal link, next billing date
- [x] 20.4 Privacy tab: GDPR/POPIA data export (JSON download of all user data), consent management
- [x] 20.5 Danger Zone tab: delete account (with confirmation modal), data retention notice
- [x] 20.6 Create API route: app/api/account/export/route.ts — compiles all user Firestore data to JSON
- [x] 20.7 Create API route: app/api/account/delete/route.ts — cancels Stripe sub, marks for deletion, notifies trustees

---

## PHASE 21 — Email Templates (Resend)

- [x] 21.1 Create lib/email.ts — Resend client, sendEmail helper
- [x] 21.2 Template: Trustee invitation — warm, human tone per brand voice
- [x] 21.3 Template: Unlock request submitted — solemn, compassionate
- [x] 21.4 Template: Unlock confirmation request (to co-trustees) — clear instructions
- [x] 21.5 Template: Unlock approved — access granted notification
- [x] 21.6 Template: Billing failure warning — empathetic, not aggressive
- [x] 21.7 Template: Account suspension warning (after 3 failed cycles)
- [x] 21.8 Template: Deletion notice (after 12 months lapse, notifies trustees)

---

## PHASE 22 — Auto-Save System

- [x] 22.1 Create hooks/useAutoSave.ts — generic hook: debounce 800ms, call Firestore update, trigger AutoSaveIndicator
- [x] 22.2 Wire useAutoSave to all 7 module forms
- [x] 22.3 Ensure resumability: on page load, fetch existing Firestore data and pre-populate all form fields

---

## PHASE 23 — PWA & Mobile

- [x] 23.1 Create public/manifest.json — PWA manifest (name, icons, theme_color: dusk, display: standalone)
- [x] 23.2 Add <link rel="manifest"> in root layout
- [x] 23.3 Ensure all touch targets ≥ 44×44px across all components
- [x] 23.4 Test and fix all multi-column form layouts to collapse to single column below md breakpoint

---

## PHASE 24 — Accessibility

- [x] 24.1 Add skip link as first focusable element in root layout ("Skip to main content")
- [x] 24.2 Ensure all icons have aria-label or aria-hidden
- [x] 24.3 All form inputs have associated <label> elements
- [x] 24.4 Modal focus trap implemented
- [x] 24.5 All CSS animations gated behind @media (prefers-reduced-motion: no-preference)
- [x] 24.6 Verify colour contrast ratios (4.5:1 body, 3:1 large text)

---

## PHASE 25 — Error Handling & Loading States

- [x] 25.1 Create app/error.tsx — global error boundary
- [x] 25.2 Create app/not-found.tsx — 404 page in brand style
- [x] 25.3 Create app/loading.tsx — skeleton loader in brand style
- [x] 25.4 Add loading skeletons to Dashboard, all module pages
- [x] 25.5 All API routes return typed error responses
- [x] 25.6 Firebase errors mapped to human-readable messages (auth/wrong-password → "That password doesn't match.")

---

*Every item above must be implemented. This is the single source of truth for build progress.*
