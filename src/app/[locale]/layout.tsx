import type { Metadata } from 'next'
import { Providers } from "@/redux/provider"
import ClientLayout from './clientLayout';
import StoreProvider from '@/providers/StoreProvider';

export const metadata: Metadata = {
    title: "PhongHop.vn",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    return (
        <html lang={params.locale}>
            <body tabIndex={-1}>
                <ClientLayout params={params}>
                    <Providers>
                        <StoreProvider>
                            {children}
                        </StoreProvider>
                    </Providers>
                </ClientLayout>
            </body>
        </html>
    );
}