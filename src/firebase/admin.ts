import { initializeApp, getApps, App, cert } from "firebase-admin/app";
import { firebaseConfig } from "./config";

// This function now expects the service account JSON to be passed as an environment variable.
// This is a critical security practice for production environments like Vercel.
function getServiceAccount() {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountJson) {
        if (process.env.NODE_ENV === 'production') {
            // In production (like on Vercel), this variable is crucial.
            // We log an error, but we don't throw it during the build process,
            // as the variable might only be available at runtime.
            console.error('CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set in production runtime. Server-side Firebase features will fail.');
        } else {
             // For local development, a warning is sufficient.
            console.warn(" is not set. Server-side Firebase features will fail if they require admin privileges.");
        }
        return null;
    }

    try {
        return JSON.parse(serviceAccountJson);
    } catch (e) {
        console.error('Failed to parse the FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it is a valid JSON string.');
        // Throw an error here because a malformed key is a definite problem.
        throw new Error('Malformed FIREBASE_SERVICE_ACCOUNT_KEY.');
    }
}

let adminApp: App | null = null;

export async function initializeAdminApp() {
  if (adminApp) {
    return adminApp;
  }
  
  // Return existing app if already initialized by another call
  const existingApp = getApps().find(app => app.name === 'admin');
  if (existingApp) {
      adminApp = existingApp;
      return adminApp;
  }

  const serviceAccount = getServiceAccount();

  // If serviceAccount is not available, we cannot initialize the admin app.
  if (!serviceAccount) {
      console.error("Firebase Admin initialization skipped: Service Account credentials not available.");
      return null;
  }

  try {
      adminApp = initializeApp({
        credential: cert(serviceAccount)
      }, 'admin');
      return adminApp;
  } catch(error) {
      console.error("Error initializing Firebase Admin app:", error);
      return null;
  }
}