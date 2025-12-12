import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme, videoConfig, socialLinks } = body;

    // Dynamically import Firebase only at runtime
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    const { getFirestore, doc, setDoc, Timestamp } = await import('firebase/firestore');
    
    // Import config — must exist at runtime
    const { firebaseConfig } = await import('../../../lib/firebaseConfig');

    // Server-side Firebase initialization
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
