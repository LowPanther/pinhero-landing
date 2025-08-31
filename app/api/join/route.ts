// app/api/join/route.ts
import { NextResponse } from "next/server";
import admin from "firebase-admin";

function getFirestore() {
  if (!admin.apps.length) {
    // Try single JSON var first
    const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (json) {
      const creds = JSON.parse(json);
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: creds.project_id,
          clientEmail: creds.client_email,
          privateKey: (creds.private_key || "").replace(/\\n/g, "\n"),
        }),
      });
    } else {
      // Fallback: separate vars
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_JSON or the trio of FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.");
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }
  }
  return admin.firestore();
}

// 🔍 GET /api/join → quick health check
export async function GET() {
  try {
    const db = getFirestore();
    const now = admin.firestore.Timestamp.now();
    return NextResponse.json({ ok: true, serverTime: now.toDate().toISOString() });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}

// ✉️ POST /api/join → handle form submissions
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const audience = String(formData.get("audience") || "users"); // "users" | "businesses"
    const email = String(formData.get("email") || "");
    const city = String(formData.get("city") || "");
    const discover = String(formData.get("discover") || "");
    const value = String(formData.get("value") || "");
    const hope = String(formData.get("hope") || "");
    const challenge = String(formData.get("challenge") || "");
    const honey = String(formData.get("_hp") || ""); // honeypot

    // validation
    if (!email || honey) {
      return NextResponse.redirect(new URL("/error", req.url), { status: 303 });
    }

    const db = getFirestore();
    const now = admin.firestore.Timestamp.now();

    // Prevent duplicate signups by email
    const existing = await db.collection("waitlist").where("email", "==", email).limit(1).get();
    if (!existing.empty) {
      return NextResponse.redirect(new URL("/thanks", req.url), { status: 303 });
    }

    await db.collection("waitlist").add({
      audience,
      email,
      city,
      discover,
      value,
      hope,
      challenge,
      ua: req.headers.get("user-agent") || "",
      ip: req.headers.get("x-forwarded-for") || "",
      createdAt: now,
      updatedAt: now,
      source: "landing-v1",
    });

    return NextResponse.redirect(new URL("/thanks", req.url), { status: 303 });
  } catch (err) {
    console.error("Join route error:", err);
    return NextResponse.redirect(new URL("/error", req.url), { status: 303 });
  }
}
