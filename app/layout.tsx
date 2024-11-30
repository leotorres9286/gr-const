'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider, addLocale, locale } from 'primereact/api';
import es from 'primelocale/es.json';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import '../styles/components/components.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { SessionProvider } from 'next-auth/react';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    library.add(fas);
    addLocale('es', es.es);
    locale('es');

    // function getThemeLocalStorage(): string {
    //     const storageLayoutConfig = localStorage.getItem(process.env.NEXT_PUBLIC_KEY_LOCAL_STORAGE_LAYOUT_CONFIG!);
    //     if (storageLayoutConfig) return JSON.parse(storageLayoutConfig).theme;

    //     localStorage.setItem(process.env.NEXT_PUBLIC_KEY_LOCAL_STORAGE_LAYOUT_CONFIG!, 'lara-light-blue');
    //     return 'lara-light-blue';
    // }

    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <link id="theme-css" href="/themes/lara-light-blue/theme.css" rel="stylesheet"></link>
            </head>
            <body>
                {/* <SessionProvider> */}
                    <PrimeReactProvider>
                        <LayoutProvider>{children}</LayoutProvider>
                    </PrimeReactProvider>
                {/* </SessionProvider> */}
            </body>
        </html>
    );
}
