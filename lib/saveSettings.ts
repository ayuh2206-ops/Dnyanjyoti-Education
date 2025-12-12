'use client';

export type SiteSettings = {
  theme: { primary: string; accent: string; background: string };
  videoConfig: { type: string; src: string; title?: string };
  socialLinks: { whatsapp?: string; telegram?: string };
  updatedAt?: any;
};

// Client-side helper that calls the server API route
export async function saveSettings(settings: SiteSettings) {
  try {
    const res = await fetch('/api/saveSettings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Settings saved to Firestore:', data);
    return data;
  } catch (err) {
    console.error('Failed to save settings:', err);
    throw err;
  }
}

export default saveSettings;
