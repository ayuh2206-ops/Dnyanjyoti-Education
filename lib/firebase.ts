import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Import your config from `lib/firebaseConfig.ts` (create this file with your keys)
// NOTE: Do NOT commit your real `lib/firebaseConfig.ts` — use the example below.
import { firebaseConfig } from './firebaseConfig';

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
