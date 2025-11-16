// app/api/join/route.ts
import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { Resend } from "resend";

let firebaseProjectId: string | undefined = undefined;

function getFirestore() {
  if (!admin.apps.length) {
    const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (json) {
      try {
        // Handle case where the JSON might be wrapped in quotes or have extra whitespace
        let jsonString = json.trim();
        // Remove surrounding quotes if present
        if ((jsonString.startsWith('"') && jsonString.endsWith('"')) || 
            (jsonString.startsWith("'") && jsonString.endsWith("'"))) {
          jsonString = jsonString.slice(1, -1);
        }
        // Unescape any escaped quotes
        jsonString = jsonString.replace(/\\"/g, '"').replace(/\\'/g, "'");
        
        const creds = JSON.parse(jsonString);
        firebaseProjectId = creds.project_id;
        console.log(`✅ Parsed Firebase credentials for project: ${firebaseProjectId}`);
        
        if (!firebaseProjectId || !creds.client_email || !creds.private_key) {
          throw new Error("Missing required fields in Firebase credentials (project_id, client_email, or private_key)");
        }
        
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: firebaseProjectId,
            clientEmail: creds.client_email,
            privateKey: (creds.private_key || "").replace(/\\n/g, "\n"),
          }),
        });
        console.log(`✅ Firebase Admin initialized for project: ${firebaseProjectId}`);
      } catch (parseError) {
        console.error(`❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON`);
        console.error(`❌ Error:`, (parseError as Error).message);
        console.error(`❌ First 100 chars of value:`, json?.substring(0, 100));
        console.error(`❌ Environment variable exists:`, !!json);
        console.error(`❌ Environment variable length:`, json?.length);
        throw new Error(
          `Invalid FIREBASE_SERVICE_ACCOUNT_JSON format. Error: ${(parseError as Error).message}. ` +
          `Make sure the environment variable contains valid JSON, not just the variable name.`
        );
      }
    } else {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
      if (!projectId || !clientEmail || !privateKey) {
        console.error(`❌ Missing Firebase credentials. FIREBASE_SERVICE_ACCOUNT_JSON: ${!!json}`);
        console.error(`❌ FIREBASE_PROJECT_ID: ${!!projectId}`);
        console.error(`❌ FIREBASE_CLIENT_EMAIL: ${!!clientEmail}`);
        console.error(`❌ FIREBASE_PRIVATE_KEY: ${!!privateKey}`);
        throw new Error(
          "Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_JSON or the trio of FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY."
        );
      }
      firebaseProjectId = projectId;
      console.log(`✅ Using separate Firebase credentials for project: ${firebaseProjectId}`);
      admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      });
    }
  } else {
    // App already initialized, try to get project ID
    try {
      const app = admin.app();
      firebaseProjectId = app.options.projectId;
    } catch (e) {
      // Ignore
    }
  }
  return admin.firestore();
}

// Send email notification
async function sendNotificationEmail(data: {
  audience: string;
  email: string;
  city: string;
  discover?: string;
  value?: string;
  hope?: string;
  challenge?: string;
  businessName?: string;
}) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "justinduncan@hopskip.co.za";
    
    const isBusiness = data.audience === "businesses";
    const subject = `New ${isBusiness ? "Business" : "User"} Waitlist Signup - Hopskip`;
    
    const emailBody = `
      <h2>New Waitlist Signup</h2>
      <p><strong>Type:</strong> ${isBusiness ? "Business" : "User"}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>City:</strong> ${data.city || "Not provided"}</p>
      ${isBusiness && data.businessName ? `<p><strong>Business Name:</strong> ${data.businessName}</p>` : ""}
      ${isBusiness && data.hope ? `<p><strong>What they hope Hopskip brings:</strong><br>${data.hope}</p>` : ""}
      ${isBusiness && data.challenge ? `<p><strong>Biggest challenge:</strong><br>${data.challenge}</p>` : ""}
      ${!isBusiness && data.discover ? `<p><strong>What they'd love to discover:</strong><br>${data.discover}</p>` : ""}
      ${!isBusiness && data.value ? `<p><strong>What would make Hopskip valuable:</strong><br>${data.value}</p>` : ""}
      <hr>
      <p><small>Time: ${new Date().toLocaleString()}</small></p>
    `;

    await resend.emails.send({
      from: "Hopskip <notifications@hopskip.co.za>",
      to: notificationEmail,
      subject: subject,
      html: emailBody,
    });
  } catch (error) {
    // Log error but don't fail the signup if email fails
    console.error("Failed to send notification email:", error);
  }
}

// Health check and test endpoint
export async function GET() {
  const logs: string[] = [];
  const log = (msg: string) => {
    console.log(msg);
    logs.push(msg);
  };
  
  try {
    log("🔧 Starting Firestore connection test...");
    
    const db = getFirestore();
    log("✅ Firestore instance created");
    
    // Verify which project we're connected to
    let projectId = firebaseProjectId;
    try {
      const app = admin.app();
      projectId = app.options.projectId || firebaseProjectId;
    } catch (e) {
      // Use stored project ID
    }
    log(`🏗️ Connected to Firebase project: ${projectId || 'UNDEFINED - CREDENTIALS NOT LOADED'}`);
    
    if (!projectId) {
      log(`❌ CRITICAL: Firebase project ID is undefined!`);
      log(`❌ This means Firebase credentials are not being loaded correctly.`);
      log(`❌ Check Vercel environment variables.`);
    }
    
    const now = admin.firestore.Timestamp.now();
    log(`⏰ Server time: ${now.toDate().toISOString()}`);
    
    // Try to read from collections to verify connection
    log("📖 Reading waitlist_users collection...");
    const usersSnapshot = await db.collection("waitlist_users").limit(5).get();
    log(`✅ Found ${usersSnapshot.size} user documents`);
    
    log("📖 Reading waitlist_businesses collection...");
    const businessesSnapshot = await db.collection("waitlist_businesses").limit(5).get();
    log(`✅ Found ${businessesSnapshot.size} business documents`);
    
    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id, 
        email: data.email,
        city: data.city,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || 'unknown'
      };
    });
    
    const businesses = businessesSnapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id, 
        email: data.email,
        city: data.city,
        businessName: data.businessName,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || 'unknown'
      };
    });
    
    return NextResponse.json({ 
      ok: true, 
      serverTime: now.toDate().toISOString(),
      projectId: projectId,
      logs: logs,
      firestore: {
        connected: true,
        usersCount: usersSnapshot.size,
        businessesCount: businessesSnapshot.size,
        users: users,
        businesses: businesses
      }
    });
  } catch (e) {
    log(`❌ Error: ${(e as Error).message}`);
    return NextResponse.json({ 
      ok: false, 
      error: (e as Error).message,
      stack: (e as Error).stack,
      logs: logs
    }, { status: 500 });
  }
}

// Form handler
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const audience = String(formData.get("audience") || "users"); // "users" | "businesses"
    const email = String(formData.get("email") || "");
    const city = String(formData.get("city") || "");
    const discover = String(formData.get("discover") || "");  // users
    const value = String(formData.get("value") || "");        // users
    const hope = String(formData.get("hope") || "");          // businesses
    const challenge = String(formData.get("challenge") || "");// businesses
    const businessName = String(formData.get("businessName") || ""); // businesses
    const honey = String(formData.get("_hp") || "");          // honeypot

    if (!email || honey) {
      console.log(`❌ Validation failed: email=${!!email}, honey=${!!honey}`);
      return NextResponse.redirect(new URL("/error", req.url), { status: 303 });
    }

    console.log(`🔧 Initializing Firestore...`);
    const db = getFirestore();
    
    // Verify which project we're connected to
    let projectId = firebaseProjectId;
    try {
      const app = admin.app();
      projectId = app.options.projectId || firebaseProjectId;
    } catch (e) {
      // Use stored project ID
    }
    console.log(`✅ Firestore initialized`);
    console.log(`🏗️  Connected to Firebase project: ${projectId || 'UNDEFINED - CREDENTIALS NOT LOADED'}`);
    console.log(`📊 Database: Firestore`);
    
    if (!projectId) {
      console.error(`❌ CRITICAL: Firebase project ID is undefined!`);
      console.error(`❌ This means Firebase credentials are not being loaded correctly.`);
      console.error(`❌ Check Vercel environment variables.`);
    }
    const now = admin.firestore.Timestamp.now();

    // Choose collection by audience
    const collectionName =
      audience === "businesses" ? "waitlist_businesses" : "waitlist_users";

    console.log(`📝 Processing signup: ${email} (${audience})`);

    // Prevent duplicates within that audience's collection
    const existing = await db.collection(collectionName).where("email", "==", email).limit(1).get();
    if (!existing.empty) {
      console.log(`⚠️ Duplicate email found: ${email} - redirecting to thanks`);
      return NextResponse.redirect(new URL("/thanks", req.url), { status: 303 });
    }

    // Payloads are slightly different, but we keep a consistent core
    const base = {
      type: audience, // "users" | "businesses"
      email: email.trim().toLowerCase(), // Normalize email
      city: city.trim(),
      ua: req.headers.get("user-agent") || "",
      ip: req.headers.get("x-forwarded-for") || "",
      createdAt: now,
      updatedAt: now,
      source: "landing-v1",
    };
    
    console.log(`📋 Base payload created with timestamp:`, now.toDate().toISOString());

    const payload =
      audience === "businesses"
        ? { ...base, hope, challenge, businessName }
        : { ...base, discover, value };

    console.log(`💾 Attempting to save to Firestore collection: ${collectionName}`);
    console.log(`📦 Payload keys:`, Object.keys(payload));
    console.log(`📦 Payload email:`, payload.email);
    
    try {
      console.log(`💾 Saving to collection: ${collectionName}`);
      console.log(`📦 Payload preview:`, { email, city, type: audience, hasDiscover: !!discover, hasValue: !!value });
      
      const docRef = await db.collection(collectionName).add(payload);
      const docId = docRef.id;
      console.log(`✅ Document reference created: ${collectionName}/${docId}`);
      
      // Wait a moment for Firestore to process
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verify it was saved by reading it back
      const verifyDoc = await docRef.get();
      if (verifyDoc.exists) {
        const savedData = verifyDoc.data();
        console.log(`✅ Verification successful: Document exists in Firestore`);
        console.log(`📄 Saved data keys:`, Object.keys(savedData || {}));
        console.log(`📧 Saved email:`, savedData?.email);
        console.log(`🆔 Document ID: ${docId}`);
        console.log(`🔗 Full path: ${collectionName}/${docId}`);
      } else {
        console.error(`❌ Verification failed: Document does not exist after save`);
        console.error(`❌ Document ID was: ${docId}`);
        throw new Error(`Document was not saved to Firestore`);
      }
      
      // Also try querying by email to double-check
      const queryCheck = await db.collection(collectionName)
        .where("email", "==", email.trim().toLowerCase())
        .limit(1)
        .get();
      
      if (!queryCheck.empty) {
        console.log(`✅ Query verification: Found document by email query`);
        queryCheck.docs.forEach(doc => {
          console.log(`📄 Query result - ID: ${doc.id}, Email: ${doc.data().email}`);
        });
      } else {
        console.warn(`⚠️ Query verification: Could not find document by email query (might be timing issue)`);
      }
      
    } catch (firestoreError) {
      console.error(`❌ Firestore save error:`, firestoreError);
      console.error(`❌ Error message:`, (firestoreError as Error).message);
      console.error(`❌ Error code:`, (firestoreError as any).code);
      console.error(`❌ Error stack:`, (firestoreError as Error).stack);
      throw firestoreError; // Re-throw to be caught by outer catch
    }

    // Send email notification (non-blocking)
    sendNotificationEmail({
      audience,
      email,
      city,
      discover,
      value,
      hope,
      challenge,
      businessName,
    }).catch(err => console.error("Email notification error:", err));

    return NextResponse.redirect(new URL("/thanks", req.url), { status: 303 });
  } catch (err) {
    console.error("❌ Join route error:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));
    return NextResponse.redirect(new URL("/error", req.url), { status: 303 });
  }
}
