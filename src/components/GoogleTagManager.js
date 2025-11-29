"use client";

import { useEffect } from 'react';

export default function GoogleTagManager() {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

    useEffect(() => {
        if (!gtmId) {
            console.warn('GTM ID not found. Please add NEXT_PUBLIC_GTM_ID to your .env.local file.');
            return;
        }

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });

        // Load GTM script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
        document.head.appendChild(script);
    }, [gtmId]);

    if (!gtmId) return null;

    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            />
        </noscript>
    );
}
