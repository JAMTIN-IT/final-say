import React from "react";

export default function TermsPage() {
  return (
    <main className="max-w-article mx-auto px-6 py-16">
      <h1 className="font-display text-h1 text-stone-900 mb-3">Terms of Service</h1>
      <p className="font-sans text-body-sm text-stone-500 mb-10">Last updated: March 2025</p>

      <div className="prose prose-stone max-w-none font-sans space-y-8">
        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">1. Acceptance of terms</h2>
          <p className="text-stone-600 leading-relaxed">
            By creating an account and using Final Say (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">2. Description of service</h2>
          <p className="text-stone-600 leading-relaxed">
            Final Say is a personal legacy planning platform that allows individuals to document their final wishes, messages, funeral arrangements, and other personal directives. The Service is not a legal will, legal document, or substitute for professional legal advice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">3. Account responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-stone-600">
            <li>You must be at least 18 years of age to use the Service</li>
            <li>You are responsible for maintaining the security of your account credentials</li>
            <li>You are responsible for all activity that occurs under your account</li>
            <li>You must provide accurate information when creating your account</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">4. Subscription and billing</h2>
          <p className="text-stone-600 leading-relaxed">
            Final Say offers paid subscription plans. By selecting a plan, you agree to pay the applicable fees. Subscriptions automatically renew unless cancelled. You may cancel at any time through the billing portal in Settings. Refunds are handled at our discretion in accordance with applicable consumer law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">5. Data and privacy</h2>
          <p className="text-stone-600 leading-relaxed">
            Your use of the Service is subject to our <a href="/privacy" className="text-ember underline">Privacy Policy</a>. All sensitive module content is encrypted client-side. We are not responsible for data you choose to include in your legacy modules.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">6. Trustee access</h2>
          <p className="text-stone-600 leading-relaxed">
            You are solely responsible for the trustees you designate. Final Say facilitates the invitation and unlock process but does not verify the identity of trustees or guarantee their availability. We are not liable for any disputes arising from trustee access or the unlock process.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">7. Limitation of liability</h2>
          <p className="text-stone-600 leading-relaxed">
            Final Say is provided &quot;as is&quot;. We make no warranties, express or implied, regarding the Service. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">8. Termination</h2>
          <p className="text-stone-600 leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time through Settings → Data & Privacy. Upon termination, your data will be permanently erased within 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">9. Changes to terms</h2>
          <p className="text-stone-600 leading-relaxed">
            We may update these Terms from time to time. We will notify you of material changes via email. Continued use of the Service after changes take effect constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[22px] text-stone-900 mb-3">10. Contact</h2>
          <p className="text-stone-600 leading-relaxed">
            For questions about these Terms, contact us at{" "}
            <a href="mailto:legal@finalsay.app" className="text-ember underline">legal@finalsay.app</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
