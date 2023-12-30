"use client"

import React, { ReactElement, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreProvider from '@/providers/StoreProvider';
import { AppStore } from '@/lib/store';

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

    const storeRef = React.useRef<AppStore>()

    return (
        <div key={'body'}>
            {children}
        </div>
    )
}