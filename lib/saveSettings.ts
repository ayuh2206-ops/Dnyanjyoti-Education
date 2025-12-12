import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export type SiteSettings = {
  theme: { primary: string; accent: string; background: string };
  videoConfig: { type: string; src: string; title?: string };
  socialLinks: { whatsapp?: string; telegram?: string };
  updatedAt?: any;
};

export async function saveSettings(settings: SiteSettings) {
  const ref = doc(db, 'site', 'config');
  try {
    await setDoc(ref, { ...settings, updatedAt: Timestamp.now() }, { merge: true });
    console.log('Settings saved to Firestore');
  } catch (err) {
    console.error('Failed to save settings:', err);
    throw err;
  }
}

export default saveSettings;
