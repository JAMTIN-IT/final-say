import React from "react";

export default function PrivacyPage() {
  return (
    <main className="max-w-article mx-auto px-6 py-16">
      <h1 className="font-display text-h1 text-stone-900 mb-3">Privacy Policy</h1>
      <p className="font-sans text-body-sm text-stone-500 mb-10">Last updated: March 2025</p>

      <div className="prose prose-stone max-w-none font-sans space-y-8">
        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">1. Who we are</h2>
          <p className="text-stone-600 leading-relaxed">
            Final Say (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a personal legacy planning platform. We help individuals document their final wishes, messages, and arrangements for the people they trust. We are committed to protecting your privacy and handling your data with the utmost care.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">2. What data we collect</h2>
          <p className="text-stone-600 leading-relaxed mb-3">We collect the following categories of data:</p>
          <ul className="list-disc list-inside space-y-2 text-stone-600">
            <li><strong>Account data:</strong> Email address, display name, and authentication credentials</li>
            <li><strong>Profile data:</strong> Personal details you choose to enter (name, date of birth, nationality, etc.)</li>
            <li><strong>Legacy content:</strong> Funeral arrangements, digital accounts, final messages, and other module data you create</li>
            <li><strong>Trustee data:</strong> Names and email addresses of people you designate as trustees</li>
            <li><strong>Billing data:</strong> Subscription plan and payment status (processed by Stripe — we do not store card details)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">3. How we protect your data</h2>
          <p className="text-stone-600 leading-relaxed">
            All sensitive module data is encrypted client-side using AES-256 before being stored. This means that even we cannot read the contents of your legacy modules. Your encryption key is derived from your user ID and a server-side pepper, ensuring that only you (and authorised trustees after unlocking) can access your content.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">4. How we use your data</h2>
          <ul className="list-disc list-inside space-y-2 text-stone-600">
            <li>To provide, maintain, and improve the Final Say service</li>
            <li>To send trustee invitations and unlock notifications on your behalf</li>
            <li>To process payments and manage your subscription</li>
            <li>To respond to your support requests</li>
          </ul>
          <p className="text-stone-600 leading-relaxed mt-3">We never sell your data. We never share your data with third parties except as required to deliver the service (Firebase, Stripe, Resend).</p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">5. Your rights</h2>
          <p className="text-stone-600 leading-relaxed mb-3">Under GDPR and applicable privacy law, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-stone-600">
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Export</strong> a copy of your data (available in Settings → Data & Privacy)</li>
            <li><strong>Rectify</strong> inaccurate data</li>
            <li><strong>Erase</strong> your account and all associated data</li>
            <li><strong>Restrict</strong> processing of your data</li>
            <li><strong>Object</strong> to processing based on legitimate interests</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">6. Data retention</h2>
          <p className="text-stone-600 leading-relaxed">
            Your data is retained for as long as your account is active. If you delete your account, all associated data is permanently erased within 30 days. Anonymised, aggregated analytics data may be retained indefinitely.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">7. Contact us</h2>
          <p className="text-stone-600 leading-relaxed">
            For privacy-related enquiries, please email us at{" "}
            <a href="mailto:privacy@finalsay.app" className="text-ember underline">privacy@finalsay.app</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
