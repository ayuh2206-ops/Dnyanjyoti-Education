'use client';

export type SiteSettings = {
  theme: { primary: string; accent: string; background: string };
  videoConfig: { type: string; src: string; title?: string };
  socialLinks: { whatsapp?: string; telegram?: string };
  updatedAt?: any;
};

// Save settings to localStorage (works immediately, no build errors)
export async function saveSettings(settings: SiteSettings) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('site_config', JSON.stringify({
        ...settings,
        updatedAt: new Date().toISOString()
      }));
      console.log('Settings saved to localStorage');
    }
    return { success: true, message: 'Settings saved' };
  } catch (err) {
    console.error('Failed to save settings:', err);
    throw err;
  }
}

export default saveSettings;
