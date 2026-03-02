export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { sendTrusteeInvitation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toEmail, toName, fromName, userId } = body as {
      toEmail: string;
      toName: string;
      fromName: string;
      userId: string;
    };

    if (!toEmail || !toName || !fromName || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendTrusteeInvitation({ toEmail, toName, fromName, userId });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Trustee invitation error:", err);
    return NextResponse.json({ error: "Failed to send invitation" }, { status: 500 });
  }
}
