import type { Metadata } from 'next'
import { Providers } from "@/redux/provider"
import ClientLayout from './client/layout';

export const metadata: Metadata = {
    title: "Phonghop",
    description: "",
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
            <body>
                <ClientLayout params={params}>
                    <Providers>{children}</Providers>
                </ClientLayout>                
            </body>
        </html>
    );
}