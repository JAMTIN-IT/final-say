export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  const { requestId, userId, trusteeId } = await req.json();

  if (!requestId || !userId || !trusteeId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const requestRef = doc(db, `users/${userId}/unlockRequests`, requestId);
    const requestSnap = await getDoc(requestRef);

    if (!requestSnap.exists()) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const data = requestSnap.data();

    if (data.trusteeConfirmations?.[trusteeId]) {
      return NextResponse.json({ message: "Already confirmed" });
    }

    const newConfirmations = (data.confirmationsReceived ?? 0) + 1;
    const required = data.confirmationsRequired ?? 1;
    const isUnlocked = newConfirmations >= required;

    await updateDoc(requestRef, {
      [`trusteeConfirmations.${trusteeId}`]: true,
      confirmationsReceived: increment(1),
      status: isUnlocked ? "approved" : "pending",
      ...(isUnlocked ? { unlockedAt: new Date() } : {}),
    });

    if (isUnlocked) {
      await updateDoc(doc(db, "users", userId), { isLocked: false });
    }

    return NextResponse.json({ unlocked: isUnlocked });
  } catch (err) {
    console.error("Unlock confirm error:", err);
    return NextResponse.json({ error: "Failed to confirm" }, { status: 500 });
  }
}
