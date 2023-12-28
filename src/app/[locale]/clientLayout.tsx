"use client"

import { ReactElement, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreProvider from '@/providers/StoreProvider';

export default function ClientLayout({
    children,
    params
}: {
    children: ReactElement
    params: { locale: string }
}) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js')
    }, []);

    return (
        <div key={'body'}>
            <StoreProvider>
                {children}
            </StoreProvider>
        </div>
    )
}