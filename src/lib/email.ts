import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Final Say <noreply@finalsay.app>";

export async function sendTrusteeInvitation(params: {
  toEmail: string;
  toName: string;
  fromName: string;
  userId: string;
}): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: params.toEmail,
    subject: `${params.fromName} has named you as someone they trust.`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #3D3B54;">
        <div style="background: linear-gradient(135deg, #2C2A4A, #1C1B2E); padding: 40px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #FAF7F2; font-family: Georgia, serif; font-weight: 300; font-size: 28px; margin: 0;">Final Say</h1>
        </div>
        <div style="background: #FAF7F2; padding: 40px; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1C1B2E; font-family: Georgia, serif; font-weight: 400; font-size: 22px;">Hello, ${params.toName}</h2>
          <p style="line-height: 1.7;">${params.fromName} has named you as a trusted person on Final Say — a platform where people capture their final wishes, messages, and arrangements for the people they love.</p>
          <p style="line-height: 1.7;">This means that when the time comes, you may be called upon to help carry out their wishes with clarity and dignity. There's nothing you need to do right now.</p>
          <p style="line-height: 1.7;">If you'd like to create your trustee account so you're ready when needed, click below.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/trustee-signup?userId=${params.userId}" style="display: inline-block; background: #C4704A; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 500; margin: 16px 0;">Accept as Trustee</a>
          <p style="color: #6B6882; font-size: 13px; margin-top: 32px;">You received this because ${params.fromName} listed your email address. If you have questions, reply to this email.</p>
        </div>
      </div>
    `,
  });
}

export async function sendUnlockRequestNotification(params: {
  toEmail: string;
  toName: string;
  deceasedName: string;
  requestId: string;
}): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: params.toEmail,
    subject: `Unlock request submitted for ${params.deceasedName}'s Final Say`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #3D3B54;">
        <div style="background: linear-gradient(135deg, #2C2A4A, #1C1B2E); padding: 40px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #FAF7F2; font-family: Georgia, serif; font-weight: 300; font-size: 28px; margin: 0;">Final Say</h1>
        </div>
        <div style="background: #FAF7F2; padding: 40px; border-radius: 0 0 12px 12px;">
          <p style="color: #6B6882; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">A message from Final Say</p>
          <h2 style="color: #1C1B2E; font-family: Georgia, serif; font-weight: 400; font-size: 22px;">We're deeply sorry for your loss.</h2>
          <p style="line-height: 1.7;">We'll guide you through this carefully. An unlock request has been submitted for ${params.deceasedName}'s account.</p>
          <p style="line-height: 1.7;">As a named trustee, your confirmation is needed to proceed. Please click below to confirm this request.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/unlock-confirm?requestId=${params.requestId}&trusteeEmail=${params.toEmail}" style="display: inline-block; background: #C4704A; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 500; margin: 16px 0;">Confirm Unlock Request</a>
          <p style="color: #6B6882; font-size: 13px; margin-top: 32px;">There is a 48-hour hold period before access is granted to allow all parties to be notified.</p>
        </div>
      </div>
    `,
  });
}

export async function sendUnlockApprovedNotification(params: {
  toEmail: string;
  toName: string;
  deceasedName: string;
  portalUrl: string;
}): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: params.toEmail,
    subject: `Access granted — ${params.deceasedName}'s Final Say`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #3D3B54;">
        <div style="background: linear-gradient(135deg, #2C2A4A, #1C1B2E); padding: 40px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #FAF7F2; font-family: Georgia, serif; font-weight: 300; font-size: 28px; margin: 0;">Final Say</h1>
        </div>
        <div style="background: #FAF7F2; padding: 40px; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1C1B2E; font-family: Georgia, serif; font-weight: 400; font-size: 22px;">Access has been granted.</h2>
          <p style="line-height: 1.7;">The unlock request for ${params.deceasedName}'s Final Say account has been approved. You now have access to the information and messages they left for you.</p>
          <p style="line-height: 1.7;">Please take all the time you need.</p>
          <a href="${params.portalUrl}" style="display: inline-block; background: #C4704A; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 500; margin: 16px 0;">Access the Portal</a>
        </div>
      </div>
    `,
  });
}

export async function sendBillingFailureWarning(params: {
  toEmail: string;
  toName: string;
  attemptNumber: number;
}): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: params.toEmail,
    subject: "We weren't able to process your Final Say payment",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #3D3B54;">
        <div style="background: linear-gradient(135deg, #2C2A4A, #1C1B2E); padding: 40px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #FAF7F2; font-family: Georgia, serif; font-weight: 300; font-size: 28px; margin: 0;">Final Say</h1>
        </div>
        <div style="background: #FAF7F2; padding: 40px; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1C1B2E; font-family: Georgia, serif; font-weight: 400; font-size: 22px;">Hello, ${params.toName}</h2>
          <p style="line-height: 1.7;">We weren't able to process your subscription payment (attempt ${params.attemptNumber} of 3). Your account and all your information remains safe — there's no need to worry about that.</p>
          <p style="line-height: 1.7;">Please update your payment details to keep your account active.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings?tab=billing" style="display: inline-block; background: #C4704A; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 500; margin: 16px 0;">Update Payment Details</a>
        </div>
      </div>
    `,
  });
}

export async function sendDeletionNoticeToTrustees(params: {
  toEmail: string;
  toName: string;
  deceasedName: string;
}): Promise<void> {
  await resend.emails.send({
    from: FROM,
    to: params.toEmail,
    subject: `Important notice regarding ${params.deceasedName}'s Final Say account`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #3D3B54;">
        <div style="background: linear-gradient(135deg, #2C2A4A, #1C1B2E); padding: 40px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #FAF7F2; font-family: Georgia, serif; font-weight: 300; font-size: 28px; margin: 0;">Final Say</h1>
        </div>
        <div style="background: #FAF7F2; padding: 40px; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1C1B2E; font-family: Georgia, serif; font-weight: 400; font-size: 22px;">Before we delete this account</h2>
          <p style="line-height: 1.7;">We want to make sure the right people have had a chance to receive what was left for them.</p>
          <p style="line-height: 1.7;">The Final Say account for ${params.deceasedName} is scheduled for deletion due to an extended period of inactivity. As a named trustee, we wanted to notify you before this happens.</p>
          <p style="line-height: 1.7;">If you believe this account should be preserved or unlocked, please act within 30 days.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/trustee" style="display: inline-block; background: #C4704A; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 500; margin: 16px 0;">Access Trustee Portal</a>
        </div>
      </div>
    `,
  });
}
