'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
    const pathname = usePathname();

    // If items are provided, use them. Otherwise, generate from pathname.
    const crumbs = items || generateCrumbs(pathname);

    function generateCrumbs(path) {
        const parts = path.split('/').filter(Boolean);
        return parts.map((part, index) => {
            const href = `/${parts.slice(0, index + 1).join('/')}`;
            const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
            return { href, label };
        });
    }

    return (
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                <Home size={16} />
            </Link>
            {crumbs.map((crumb, index) => (
                <div key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ChevronRight size={14} />
                    <Link
                        href={crumb.href}
                        style={{
                            color: index === crumbs.length - 1 ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: index === crumbs.length - 1 ? '600' : '400',
                            textDecoration: 'none',
                            pointerEvents: index === crumbs.length - 1 ? 'none' : 'auto'
                        }}
                    >
                        {crumb.label}
                    </Link>
                </div>
            ))}
        </nav>
    );
}
