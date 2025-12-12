import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme, videoConfig, socialLinks } = body;

    // Dynamic import of Firebase modules (runtime only, no build-time resolution)
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    const { getFirestore, doc, setDoc, Timestamp } = await import('firebase/firestore');

    // Build config from environment variables
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    // Initialize Firebase
    let app;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }

    const db = getFirestore(app);
    const ref = doc(db, 'site', 'config');
    await setDoc(
      ref,
      { theme, videoConfig, socialLinks, updatedAt: Timestamp.now() },
      { merge: true }
    );

    console.log('Settings saved to Firestore');
    return NextResponse.json({ success: true, message: 'Settings saved to Firestore' });
  } catch (err: any) {
    console.error('API saveSettings error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to save settings' },
      { status: 500 }
    );
  }
}
