export type SiteSettings = {
  theme: { primary: string; accent: string; background: string };
  videoConfig: { type: string; src: string; title?: string };
  socialLinks: { whatsapp?: string; telegram?: string };
  updatedAt?: any;
};

// Use dynamic import at runtime to avoid bundler resolving firebase on server/build.
export async function saveSettings(settings: SiteSettings) {
  try {
    const [{ doc, setDoc, Timestamp }, { initializeApp, getApps, getApp }, { getFirestore }, { firebaseConfig }] = await Promise.all([
      import('firebase/firestore'),
      import('firebase/app'),
      import('firebase/firestore'),
      import('./firebaseConfig')
    ] as any);

    // initialize app if needed
    let app;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }

    const db = getFirestore(app);
    const ref = doc(db, 'site', 'config');
    await setDoc(ref, { ...settings, updatedAt: Timestamp.now() }, { merge: true });
    console.log('Settings saved to Firestore');
  } catch (err) {
    console.error('Failed to save settings:', err);
    throw err;
  }
}

export default saveSettings;
