"use client"

import { ReactElement, useEffect } from 'react'
import { I18nProviderClient } from '@/locales/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'public/assets/css/global.css'

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
        <I18nProviderClient locale={params.locale}>
            {children}
        </I18nProviderClient>
    )
}