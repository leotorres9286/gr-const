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

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    library.add(fas);
    addLocale('es', es.es);
    locale('es');

    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-blue/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
