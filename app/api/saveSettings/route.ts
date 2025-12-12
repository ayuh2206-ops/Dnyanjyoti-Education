import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../../lib/firebaseConfig';

// Server-side Firebase initialization
let app;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (err) {
  console.error('Firebase init error:', err);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme, videoConfig, socialLinks } = body;

    if (!app) {
      throw new Error('Firebase not initialized');
    }

    const db = getFirestore(app);
    const ref = doc(db, 'site', 'config');
    await setDoc(
      ref,
      { theme, videoConfig, socialLinks, updatedAt: Timestamp.now() },
      { merge: true }
    );

    return NextResponse.json({ success: true, message: 'Settings saved' });
  } catch (err: any) {
    console.error('API saveSettings error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to save' },
      { status: 500 }
    );
  }
}
