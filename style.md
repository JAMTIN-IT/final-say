# Final Say — UI/UX Style Guide & Design System

> **Version:** 1.0  
> **Date:** March 2026  
> **Audience:** Developers, designers, and copywriters implementing the Final Say platform.

---

## 1. Design Philosophy

### The Core Tension
Final Say lives at the intersection of two emotional realities: **grief and relief**. The product asks users to confront their mortality — not with dread, but with agency. The design must honour the weight of this while making the experience feel warm, considered, and even quietly empowering.

### Three Design Principles

**1. Quiet Dignity**
Every pixel should feel intentional and respectful. No flashy animations, no aggressive CTAs, no gamification that feels cheap. The UI should feel like a well-lit, private room — calm, organised, and safe.

**2. Gentle Momentum**
Death is easy to avoid thinking about. The UX must lower the activation energy of engagement — breaking overwhelming tasks into small, manageable moments. Progress should feel rewarding but never pressuring.

**3. Human First**
This is not a form. It is a conversation. Copy must feel like a thoughtful person is guiding the user, not a system prompting data entry. Every label, placeholder, tooltip, and heading is an opportunity to show empathy.

---

## 2. Brand Identity

### 2.1 Brand Name & Wordmark

**Final Say** — two words, sentence case. Never "FinalSay", "FINAL SAY", or "final say".

**Tagline options (choose per context):**
- *"Your words. Your wishes. Your way."* — primary tagline
- *"Leave nothing unsaid."* — emotional/campaign context
- *"Make sure the people you love know exactly what you want."* — explanatory context

### 2.2 Brand Voice

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Warm** | Never clinical or legal-sounding | "Tell us a little about yourself" not "Enter personal details" |
| **Honest** | Doesn't shy away from death, but never wallows in it | "When the time comes, your family will know exactly what matters to you." |
| **Unhurried** | Never creates urgency or anxiety | "Come back whenever you're ready." |
| **Empowering** | Frames completion as a gift to loved ones | "Every section you complete is one less burden for the people you love." |
| **Intimate** | Feels personal, not bureaucratic | "This is your space. Say what you really mean." |

### 2.3 What to Avoid

- ❌ Words like: "death", "dead", "corpse", "die" (favour: "passing", "when you're gone", "after you've left")
- ❌ Urgency language: "Act now", "Don't wait", "Time is running out"
- ❌ Legal jargon: "Pursuant to", "Hereinafter", "Decedent"
- ❌ Overly cheerful or dismissive language: "Easy!", "Quick!", "Done!"
- ❌ Dark humour in UI (fine in blog/marketing content written by the brand, never in app UI)

---

## 3. Colour System

### 3.1 Palette Philosophy
The palette draws from twilight — that liminal hour between day and night. Warm, deep tones that feel serene rather than cold. Muted earth tones mixed with soft sage and candlelight ivory.

### 3.2 Primary Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-dusk` | `#2C2A4A` | Primary brand colour — headings, logo, key UI elements |
| `--color-ember` | `#C4704A` | Primary accent — CTAs, highlights, active states |
| `--color-sage` | `#7A9E8E` | Secondary accent — success states, completeness indicators |
| `--color-ivory` | `#FAF7F2` | Primary background |
| `--color-parchment` | `#F0EBE1` | Card/surface background |

### 3.3 Neutral Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-stone-900` | `#1C1B2E` | Darkest text |
| `--color-stone-700` | `#3D3B54` | Body text |
| `--color-stone-500` | `#6B6882` | Secondary/muted text, labels |
| `--color-stone-300` | `#B8B6CC` | Borders, dividers |
| `--color-stone-100` | `#ECEAF5` | Subtle backgrounds, hover states |
| `--color-white` | `#FFFFFF` | Input backgrounds, overlays |

### 3.4 Semantic Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#4A8C6F` | Saved, complete, confirmed |
| `--color-warning` | `#C49A4A` | Incomplete, attention needed |
| `--color-danger` | `#A63D2F` | Errors, destructive actions |
| `--color-info` | `#4A7A9B` | Informational tooltips |

### 3.5 Gradient

Primary hero gradient (dark sections):
```css
background: linear-gradient(135deg, #2C2A4A 0%, #1C1B2E 60%, #3D2C1E 100%);
```

Soft section gradient (alternating content sections):
```css
background: linear-gradient(180deg, #FAF7F2 0%, #F0EBE1 100%);
```

---

## 4. Typography

### 4.1 Type Scale Philosophy
Type must be legible across all ages — this product is used by people across a wide age range. Generous sizing, strong contrast ratios, and humanist letterforms.

### 4.2 Font Families

| Role | Font | Fallback | Source |
|------|------|----------|--------|
| **Display / Headings** | `Cormorant Garamond` | Georgia, serif | Google Fonts |
| **Body / UI** | `Inter` | system-ui, sans-serif | Google Fonts |
| **Monospace (vault)** | `JetBrains Mono` | Courier New, monospace | Google Fonts |

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 4.3 Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-display` | 56px / 3.5rem | 300 (Cormorant) | 1.1 | Hero headlines |
| `text-h1` | 40px / 2.5rem | 400 (Cormorant) | 1.2 | Page titles |
| `text-h2` | 30px / 1.875rem | 400 (Cormorant) | 1.3 | Section headings |
| `text-h3` | 22px / 1.375rem | 600 (Inter) | 1.4 | Card titles, module names |
| `text-h4` | 18px / 1.125rem | 500 (Inter) | 1.5 | Sub-section titles |
| `text-body-lg` | 18px / 1.125rem | 400 (Inter) | 1.7 | Lead paragraphs |
| `text-body` | 16px / 1rem | 400 (Inter) | 1.6 | Standard body |
| `text-body-sm` | 14px / 0.875rem | 400 (Inter) | 1.6 | Secondary text, captions |
| `text-label` | 12px / 0.75rem | 500 (Inter) | 1.4 | Form labels, tags |
| `text-mono` | 14px / 0.875rem | 400 (JetBrains) | 1.5 | Passwords, codes, keys |

### 4.4 Typography Rules

- Headings in Cormorant Garamond are **never bold** (max weight 600, used sparingly). Their elegance comes from lightness.
- Never use pure black (`#000`) for text. Use `--color-stone-900`.
- Minimum body text contrast ratio: 4.5:1 (WCAG AA).
- Italic Cormorant is used for emotional/poetic moments: quotes, taglines, section intros.
- Avoid text smaller than 12px in any context.

---

## 5. Spacing & Layout

### 5.1 Spacing Scale (8px base unit)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro spacing (icon padding) |
| `space-2` | 8px | Tight spacing (between label and input) |
| `space-3` | 12px | |
| `space-4` | 16px | Standard component spacing |
| `space-5` | 20px | |
| `space-6` | 24px | Card padding, section gaps |
| `space-8` | 32px | Large gaps |
| `space-10` | 40px | Section padding |
| `space-12` | 48px | |
| `space-16` | 64px | Major section breaks |
| `space-20` | 80px | Hero/page-level spacing |
| `space-24` | 96px | |

### 5.2 Layout Grid

- **Max content width:** 1200px
- **Content column (forms/articles):** 720px max-width, centred
- **Narrow column (authentication):** 480px max-width, centred
- **Dashboard grid:** 3-column on desktop, 2-column tablet, 1-column mobile
- **Gutter:** 24px (desktop), 16px (tablet), 16px (mobile)
- **Page padding (horizontal):** 24px minimum on all viewports

### 5.3 Breakpoints

| Name | Value | Target |
|------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

---

## 6. Component Library

### 6.1 Buttons

**Primary Button** (ember accent — use for main CTAs only)
```
Background: --color-ember (#C4704A)
Text: white, Inter 500, 15px
Padding: 12px 28px
Border radius: 6px
Hover: darken 10% → #A85A37
Active: darken 15%
Disabled: opacity 0.4, no cursor pointer
Transition: background 200ms ease
```

**Secondary Button** (outlined)
```
Background: transparent
Border: 1.5px solid --color-dusk (#2C2A4A)
Text: --color-dusk, Inter 500, 15px
Padding: 11px 27px (accounts for border)
Border radius: 6px
Hover: background --color-stone-100
```

**Ghost Button** (text-only)
```
Background: transparent
Text: --color-ember, Inter 500, 15px
Padding: 12px 16px
Hover: background --color-stone-100, border radius 6px
```

**Destructive Button**
```
Background: --color-danger (#A63D2F)
Text: white
Same sizing as Primary
```

**Button States:** All buttons must have focus-visible ring: `outline: 2px solid --color-ember; outline-offset: 3px;`

---

### 6.2 Form Elements

**Text Input**
```
Background: #FFFFFF
Border: 1.5px solid --color-stone-300
Border radius: 6px
Padding: 12px 16px
Font: Inter 400, 16px, --color-stone-700
Placeholder: --color-stone-500

Focus: border-color --color-dusk, box-shadow: 0 0 0 3px rgba(44,42,74,0.12)
Error: border-color --color-danger, box-shadow: 0 0 0 3px rgba(166,61,47,0.12)
Success: border-color --color-success
Disabled: background --color-stone-100, opacity 0.6
```

**Textarea**
- Same as text input
- `resize: vertical` only
- Min-height: 120px
- Line-height: 1.6 for readability

**Select / Dropdown**
- Same border treatment as text input
- Custom arrow icon (not browser default) using `--color-stone-500`
- Options panel: white background, `box-shadow: 0 8px 24px rgba(0,0,0,0.12)`

**Form Label**
```
Font: Inter 500, 13px
Color: --color-stone-700
Margin-bottom: 6px
Letter-spacing: 0.02em
Text-transform: none (never uppercase labels)
```

**Helper Text**
```
Font: Inter 400, 13px
Color: --color-stone-500
Margin-top: 4px
```

**Error Text**
```
Font: Inter 400, 13px
Color: --color-danger
Margin-top: 4px
Icon: small warning icon preceding text
```

**Toggle / Switch**
```
Track (off): --color-stone-300
Track (on): --color-sage
Thumb: white, slight box-shadow
Width: 44px, Height: 24px
Transition: 200ms ease
```

**Checkbox**
```
Size: 18px × 18px
Border: 1.5px solid --color-stone-300
Border radius: 4px
Checked: background --color-dusk, checkmark white
```

---

### 6.3 Cards

**Module Card (Dashboard)**
```
Background: --color-parchment (#F0EBE1)
Border: 1px solid rgba(44,42,74,0.08)
Border radius: 12px
Padding: 24px
Box-shadow: 0 2px 8px rgba(0,0,0,0.06)

Hover: box-shadow: 0 4px 16px rgba(0,0,0,0.10), translateY(-2px)
Transition: 200ms ease
```

**Content Card (forms, messages)**
```
Background: #FFFFFF
Border: 1px solid --color-stone-300
Border radius: 10px
Padding: 24px 28px
```

**Message Card (Final Messages module)**
```
Background: #FFFFFF
Border-left: 4px solid --color-ember
Border radius: 0 10px 10px 0
Padding: 20px 24px
Box-shadow: 0 2px 12px rgba(0,0,0,0.06)
```

**Alert / Info Box**
```
Background: rgba(74,122,155,0.08)
Border: 1px solid rgba(74,122,155,0.3)
Border-radius: 8px
Padding: 16px 20px
Icon: info circle, --color-info
```

---

### 6.4 Navigation

**Top Navigation Bar**
```
Background: #FFFFFF
Border-bottom: 1px solid --color-stone-300
Height: 64px
Logo: left-aligned, 140px wide max
Nav links: Inter 500, 14px, --color-stone-700
Active link: --color-dusk, border-bottom 2px --color-ember
CTA button: Primary button, compact
Padding: 0 24px
```

**Sidebar (Questionnaire / Dashboard)**
```
Background: --color-dusk (#2C2A4A)
Width: 260px
Text: white / rgba(255,255,255,0.7)
Active item: background rgba(196,112,74,0.2), left border 3px --color-ember, text white
Padding per item: 12px 20px
Icon size: 20px, margin-right 12px
Section dividers: rgba(255,255,255,0.1) 1px
```

---

### 6.5 Progress Indicators

**Module Completion Ring (Dashboard cards)**
```
SVG circle ring, 48px diameter
Stroke: --color-sage for completed portion
Track: --color-stone-300
Percentage text: Inter 600, 13px, centered
```

**Linear Progress Bar (inside questionnaire)**
```
Height: 4px
Background track: --color-stone-100
Fill: linear-gradient(90deg, --color-ember, --color-sage)
Border radius: 2px
Animate fill on load: 600ms ease
```

**Step Indicator (multi-step forms)**
```
Circles: 28px diameter
Incomplete: border 2px --color-stone-300, white fill, --color-stone-500 number
Current: border 2px --color-ember, --color-ember fill, white number
Complete: --color-sage fill, white checkmark
Connector line: 1px --color-stone-300 (incomplete) or --color-sage (complete)
```

---

### 6.6 Badges & Tags

**Completion Badge**
```
"Complete" — background rgba(74,140,111,0.12), text --color-success, border 1px rgba(74,140,111,0.3)
"In Progress" — background rgba(196,154,74,0.12), text --color-warning, border 1px rgba(196,154,74,0.3)
"Not Started" — background --color-stone-100, text --color-stone-500
Font: Inter 500, 11px, padding 3px 8px, border radius 20px
```

**Tone Tags (Final Messages)**
```
Loving: soft pink — #F5E6E8 / #8B3A52
Honest: warm amber — #F5EDD6 / #7A5A1E
Instructional: light blue — #E6EEF5 / #1E4A7A
Revelatory: soft violet — #EDE6F5 / #4A1E7A
Apologetic: warm grey — #EDEAE6 / #5A4A3A
Celebratory: sage green — #E6F5EE / #1E7A4A
```

---

### 6.7 Modals & Overlays

**Modal Container**
```
Overlay: rgba(28,27,46,0.7), backdrop-filter: blur(4px)
Modal: background white, border-radius 16px, max-width 560px
Padding: 40px
Box-shadow: 0 24px 64px rgba(0,0,0,0.2)
Close button: top-right, 32px, ghost style
Animate in: scale(0.95)→scale(1) + opacity 0→1, 250ms ease-out
```

**Sensitive Confirmation Modal** (used before Final Messages, before unlock)
```
Adds: left border 4px --color-ember, warm background --color-parchment
Always includes: empathetic copy explaining the weight of the action
Always includes: secondary "I'm not ready yet" exit option
```

---

## 7. Iconography

### 7.1 Icon Library
Use **Lucide React** for all UI icons. Supplement with custom SVG only where Lucide does not have an appropriate icon.

### 7.2 Sizes
- 16px — inline text icons, labels
- 20px — navigation, list items
- 24px — standard UI (buttons, cards)
- 32px — section headers, empty states
- 48px — feature icons, large empty states

### 7.3 Module Icons

| Module | Lucide Icon | Hex override |
|--------|------------|--------------|
| Profile | `User` | `--color-dusk` |
| Funeral Arrangements | `Flower2` | `--color-ember` |
| Digital Vault | `Lock` | `--color-dusk` |
| Final Messages | `MessageSquareHeart` | `--color-ember` |
| Trustees | `Users` | `--color-sage` |
| Pets & Dependants | `Heart` | `--color-ember` |
| Life Philosophy | `Feather` | `--color-sage` |

---

## 8. Motion & Animation

### 8.1 Principles
- **Purposeful only.** Animation communicates state changes, not decoration.
- **Never distracting.** Max duration 400ms. Nothing loops or pulses in idle state.
- **Respect reduced motion.** All animations must honour `prefers-reduced-motion: reduce`.

### 8.2 Standard Easing
```css
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);   /* most transitions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);            /* elements leaving */
--ease-out: cubic-bezier(0, 0, 0.2, 1);           /* elements entering */
```

### 8.3 Standard Durations
```css
--duration-fast: 150ms;    /* hover states, toggles */
--duration-base: 250ms;    /* most UI transitions */
--duration-slow: 400ms;    /* page transitions, modals */
--duration-reveal: 600ms;  /* content reveals, progress bars */
```

### 8.4 Page Transitions
Route changes: fade + slight upward translate.
```css
/* entering page */
animation: pageIn 300ms ease-out;

@keyframes pageIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### 8.5 Auto-Save Indicator
A subtle "Saved" indicator appears 800ms after last keystroke:
```
Fade in → show "✓ Saved" in --color-success, Inter 400 13px → fade out after 2s
Position: top-right of form section, non-intrusive
```

---

## 9. Empty States & Onboarding

### 9.1 Empty State Design
Each module has a dedicated empty state:

```
Icon: large (48px), --color-stone-300
Heading: Cormorant Garamond 400, 22px, --color-stone-700
Body: Inter 400, 15px, --color-stone-500, max 2 lines
CTA: Primary or Ghost button depending on context
```

**Example copy per module:**

| Module | Heading | Body |
|--------|---------|------|
| Funeral Arrangements | *"Your service, your way"* | "Tell us how you'd like to be remembered. Every detail helps." |
| Digital Vault | *"Your digital life, accounted for"* | "Add your accounts here so they're handled exactly as you'd want." |
| Final Messages | *"Say what you've always meant to say"* | "Leave words for the people who matter most. Take all the time you need." |
| Life Philosophy | *"Your story, in your words"* | "What do you believe? What have you learned? This is yours to tell." |
| Trustees | *"Choose who you trust"* | "Nominate the people you want to carry out your wishes." |

---

## 10. Copy Framework

### 10.1 Voice Across Contexts

**Marketing / Landing Page:** Warm, inviting, slightly poetic. Leads with relief and empowerment, not fear.

**Onboarding:** Conversational, encouraging. Uses "you" and "your" frequently. Short sentences.

**Form Labels:** Clear, plain English. Never jargon. Feels like a thoughtful friend asking, not a bureaucrat.

**Error Messages:** Human and helpful. Never blame the user. Offer a way forward.

**Confirmation / Success:** Affirming without being saccharine. Acknowledge the weight of what they just did.

**Empty States:** Gentle invitation, not a scolding about incomplete data.

**Trustee Unlock Flow:** Solemn, clear, compassionate. Acknowledges grief directly.

---

### 10.2 Key Copy Samples

**Hero Headline:**
> *Leave nothing unsaid.*

**Hero Sub-headline:**
> Final Say gives you the space to capture your wishes, your words, and your truth — so the people you love never have to guess.

**Onboarding Welcome Screen:**
> *This is your Final Say.*
> 
> You're here because you care about the people you'll leave behind. Take your time. There's no rush, no deadline, no wrong answer. Every word you write here is a gift.

**Before Final Messages module:**
> *You're about to enter the most personal part of Final Say.*
>
> This is where you can write what you've always meant to say — without filter, without fear. These words will reach the people you choose, in your own time. Take a breath. You can come back anytime.

**Auto-save confirmation:**
> ✓ Saved quietly

**Trustee invitation email subject:**
> [Name] has named you as someone they trust.

**Unlock request received:**
> We're deeply sorry for your loss. We'll guide you through this carefully.

**Account deletion warning:**
> Before we delete this account, we want to make sure the right people have had a chance to receive what was left for them.

---

### 10.3 Questionnaire Prompt Samples

These are the conversational prompts that appear above form fields — replacing dry field labels with genuine human questions:

| Module | Field | Prompt |
|--------|-------|--------|
| Profile | Bio | *"How would you describe your life to someone who never knew you?"* |
| Funeral | Service type | *"How would you like people to gather in your honour?"* |
| Funeral | Music | *"What songs should fill the room?"* |
| Funeral | Flowers | *"Are there flowers that mean something to you — or that you'd rather not see?"* |
| Funeral | Prohibitions | *"Is there anything you'd really rather people didn't do?"* |
| Digital Vault | Password | *"The password, kept safe until it's needed."* |
| Final Messages | Body | *"Say everything you've been meaning to say."* |
| Life Philosophy | Regrets | *"Are there regrets you'd like to name? You don't have to carry them alone."* |
| Life Philosophy | Values | *"What do you hope lives on through the people who knew you?"* |

---

## 11. Responsive Design

### 11.1 Mobile-First Rules
- Touch targets: minimum 44px × 44px
- No hover-only interactions; all functionality accessible via tap/click
- Bottom navigation on mobile (5 icons max): Home, Modules, Messages, Trustees, Settings
- Sidebar collapses to bottom sheet on mobile
- Multi-column forms collapse to single column below `md` breakpoint

### 11.2 Touch Gestures
- Swipe right to go back (within questionnaire steps)
- Long-press on message card to reveal edit/delete options
- Pull-to-refresh on dashboard

---

## 12. Accessibility

- **Colour contrast:** All text meets WCAG 2.1 AA (4.5:1 body, 3:1 large text)
- **Focus management:** Visible focus ring on all interactive elements, colour: `--color-ember`
- **Screen reader:** All icons have `aria-label` or `aria-hidden` as appropriate; all form inputs have associated `<label>` elements
- **Keyboard navigation:** Full tab order; modals trap focus; ESC closes overlays
- **Skip link:** "Skip to main content" as first focusable element on every page
- **Reduced motion:** All CSS animations gated behind `@media (prefers-reduced-motion: no-preference)`
- **Font scaling:** UI functional at browser font sizes up to 200% zoom

---

## 13. Dark Mode

Dark mode is **not in scope for v1** but the design token system must support it. All colour values must be defined as CSS custom properties so a dark theme can be layered on without refactoring.

```css
:root {
  --color-bg-primary: #FAF7F2;
  --color-bg-surface: #F0EBE1;
  /* ... */
}

[data-theme="dark"] {
  --color-bg-primary: #1C1B2E;
  --color-bg-surface: #2C2A4A;
  /* ... */
}
```

---

## 14. Tailwind Configuration

Below is the recommended `tailwind.config.js` extension to implement this design system:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        dusk: '#2C2A4A',
        ember: {
          DEFAULT: '#C4704A',
          dark: '#A85A37',
        },
        sage: '#7A9E8E',
        ivory: '#FAF7F2',
        parchment: '#F0EBE1',
        stone: {
          900: '#1C1B2E',
          700: '#3D3B54',
          500: '#6B6882',
          300: '#B8B6CC',
          100: '#ECEAF5',
        },
        success: '#4A8C6F',
        warning: '#C49A4A',
        danger: '#A63D2F',
        info: '#4A7A9B',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '300' }],
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '400' }],
        'h2': ['1.875rem', { lineHeight: '1.3', fontWeight: '400' }],
        'h3': ['1.375rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        'card': '12px',
        'input': '6px',
        'badge': '20px',
        'modal': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.10)',
        'modal': '0 24px 64px rgba(0,0,0,0.2)',
        'input-focus': '0 0 0 3px rgba(44,42,74,0.12)',
        'input-error': '0 0 0 3px rgba(166,61,47,0.12)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
        'reveal': '600ms',
      },
      maxWidth: {
        'content': '1200px',
        'article': '720px',
        'narrow': '480px',
      },
    },
  },
  plugins: [],
}
```

---

## 15. Sample Screen Layouts

### 15.1 Dashboard (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│ NAVBAR: [Logo]  [Dashboard] [My Plan] [Settings]    [Account ▾] │
├──────────────────┬──────────────────────────────────────────────┤
│                  │                                              │
│  SIDEBAR (dusk)  │  MAIN CONTENT (ivory)                        │
│                  │                                              │
│  ○ Profile       │  Good evening, James.                        │
│  ● Funeral       │  *Your Final Say is 42% complete.*           │
│  ○ Digital Vault │                                              │
│  ○ Messages      │  [████████░░░░░░░░░░░] 42%                   │
│  ○ Trustees      │                                              │
│  ○ Pets          │  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  ○ Philosophy    │  │ Profile  │ │ Funeral  │ │  Vault   │     │
│  ─────────────   │  │  ◉ 80%  │ │  ◉ 60%  │ │  ◉ 20%  │     │
│  ○ Settings      │  │         │ │          │ │          │     │
│                  │  └──────────┘ └──────────┘ └──────────┘     │
│                  │  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│                  │  │Messages  │ │ Trustees │ │Philosophy│     │
│                  │  │  ◉ 10%  │ │  ◉ 50%  │ │  ◉  0%  │     │
│                  │  └──────────┘ └──────────┘ └──────────┘     │
│                  │                                              │
└──────────────────┴──────────────────────────────────────────────┘
```

### 15.2 Questionnaire (Single Question)

```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back]    Funeral Arrangements · Step 3 of 8    [Exit]        │
│ ────────────────────────────────────────                         │
│ [██████░░░░░░░░░░] 37%                                           │
│                                                                  │
│                                                                  │
│    What songs should fill the room?                              │
│                                                                  │
│    ┌───────────────────────────────────────────────────────┐     │
│    │ + Add a song                                          │     │
│    │                                                       │     │
│    │  ♪  [Song name or artist...]    [When: ▾]  [×]       │     │
│    │  ♪  [Song name or artist...]    [When: ▾]  [×]       │     │
│    └───────────────────────────────────────────────────────┘     │
│                                                                  │
│    And are there songs you'd rather not hear?                    │
│    ┌───────────────────────────────────────────────────────┐     │
│    │                                                       │     │
│    └───────────────────────────────────────────────────────┘     │
│                                                                  │
│    ✓ Saved quietly                                               │
│                                                                  │
│                              [Continue →]                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 16. Asset Checklist for Developers

Before implementation begins, ensure the following are available:

- [ ] Google Fonts loaded (Cormorant Garamond, Inter, JetBrains Mono)
- [ ] Lucide React installed (`npm install lucide-react`)
- [ ] Tailwind config extended per Section 14
- [ ] CSS custom properties defined in `globals.css`
- [ ] shadcn/ui initialised with custom theme tokens mapped
- [ ] Favicon: a minimal candle or feather mark in `--color-ember` on `--color-dusk` background
- [ ] OG image created: dark gradient background, wordmark, tagline
- [ ] Firebase project created with Firestore, Auth, Storage enabled
- [ ] Stripe account created with products configured per pricing table
- [ ] Resend account + verified sending domain

---

*End of Style Guide — Final Say v1.0*
