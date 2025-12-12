// Firebase configuration from environment variables
// For local development, ensure .env.local is populated with:
// NEXT_PUBLIC_FIREBASE_API_KEY, etc.

// Note: Firebase client SDK imports are commented out to avoid build-time module resolution.
// To re-enable Firestore saves, set up a proper Next.js API route or middleware.

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export default firebaseConfig;
