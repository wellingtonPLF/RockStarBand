import { useEffect, useState } from 'react';
import CookieConsentView from './cookieConsentView';
import CookiePreferencesView from './cookiePreferencesView';

const STORAGE_KEY = 'cookieConsent';
const OPEN_PREFERENCES_EVENT = 'open-cookie-preferences';

const defaultPreferences = {
    performance: false,
    functional: false,
    advertising: false,
    social: false
};

export const openCookiePreferences = () => {
    window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
};

const CookieConsentScript = () => {
    const [bannerMounted, setBannerMounted] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(false);
    const [preferencesOpen, setPreferencesOpen] = useState(false);
    const [preferences, setPreferences] = useState(defaultPreferences);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            setBannerMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setBannerVisible(true));
            });
        } else {
            try {
                setPreferences({ ...defaultPreferences, ...JSON.parse(stored) });
            } catch (_) {}
        }

        const handleOpenPreferences = () => setPreferencesOpen(true);
        window.addEventListener(OPEN_PREFERENCES_EVENT, handleOpenPreferences);
        return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handleOpenPreferences);
    }, []);

    const dismissBanner = () => {
        setBannerVisible(false);
        setTimeout(() => setBannerMounted(false), 350);
    };

    const savePreferences = (prefs) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        setPreferences(prefs);
        setPreferencesOpen(false);
        dismissBanner();
    };

    const handleTogglePreference = (key) => {
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {bannerMounted && (
                <CookieConsentView
                    visible={bannerVisible}
                    onAccept={() => savePreferences({ performance: true, functional: true, advertising: true, social: true })}
                    onReject={() => savePreferences(defaultPreferences)}
                    onClose={dismissBanner}
                    onOpenPreferences={() => setPreferencesOpen(true)}
                />
            )}
            <CookiePreferencesView
                open={preferencesOpen}
                preferences={preferences}
                onTogglePreference={handleTogglePreference}
                onClose={() => setPreferencesOpen(false)}
                onConfirm={() => savePreferences(preferences)}
                onAllowAll={() => savePreferences({ performance: true, functional: true, advertising: true, social: true })}
            />
        </>
    );
};

export default CookieConsentScript;
