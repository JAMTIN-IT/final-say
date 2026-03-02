export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trustee } from "@/types/trustees";
import { sendUnlockRequestNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { userId, requestedBy, requestedByEmail, ownerName } = await req.json();

  if (!userId || !requestedBy) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const trusteesSnap = await getDocs(collection(db, `users/${userId}/trustees`));
    const trustees = trusteesSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Trustee) }));

    if (trustees.length === 0) {
      return NextResponse.json({ error: "No trustees on record" }, { status: 400 });
    }

    const ref = await addDoc(collection(db, `users/${userId}/unlockRequests`), {
      userId,
      requestedBy,
      requestedByEmail,
      requestedAt: serverTimestamp(),
      status: "pending",
      confirmationsReceived: 0,
      confirmationsRequired: Math.max(1, Math.ceil(trustees.length / 2)),
      trusteeConfirmations: {},
    });

    for (const trustee of trustees) {
      try {
        await sendUnlockRequestNotification({
          toEmail: trustee.email,
          toName: trustee.fullName,
          deceasedName: ownerName,
          requestId: ref.id,
        });
      } catch {
        // non-blocking
      }
    }

    return NextResponse.json({ requestId: ref.id });
  } catch (err) {
    console.error("Unlock request error:", err);
    return NextResponse.json({ error: "Failed to create unlock request" }, { status: 500 });
  }
}
