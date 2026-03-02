export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  }

  try {
    const data: Record<string, unknown> = {};

    const userDoc = await getDoc(doc(db, "users", uid));
    data.account = userDoc.data() ?? {};

    for (const col of ["trustees", "dependants"]) {
      const snap = await getDocs(collection(db, `users/${uid}/${col}`));
      data[col] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }

    for (const col of ["profile", "funeralArrangements", "lifePhilosophy"]) {
      const snap = await getDoc(doc(db, `users/${uid}/${col}/main`));
      data[col] = snap.exists() ? snap.data() : null;
    }

    for (const col of ["digitalAccounts", "deviceAccess", "financialPointers", "messages"]) {
      const snap = await getDocs(collection(db, `users/${uid}/${col}`));
      data[col] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }

    const json = JSON.stringify({ exportedAt: new Date().toISOString(), uid, data }, null, 2);
    return new NextResponse(json, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="final-say-export-${uid}.json"`,
      },
    });
  } catch (err) {
    console.error("GDPR export error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
