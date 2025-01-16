'use client'

import {Nunito} from 'next/font/google';

import './globals.css';
import {Providers} from '@/shared/components/shared/providers';
import {usePathname} from "next/navigation";
import {cn} from "@/shared/lib/utils";

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    const isCheckoutPage = pathname === '/checkout';

    return (
        <html lang="en">
        <head>
            <link rel="icon" href="https://dodopizza.ae/favicon.ico"/>
            <meta property="og:image" content="https://cdn.dodostatic.com/images/og/Dodo-Snippet-min-en.jpg"/>
            <link data-rh="true" rel="icon" href="/logo.png"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        </head>
        <body className={cn(nunito.className, {'bg-[#F4F1EE]': isCheckoutPage})}>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
