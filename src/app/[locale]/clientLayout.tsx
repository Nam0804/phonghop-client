"use client"

import { ReactElement, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'public/assets/css/global.css'
import 'public/assets/css/responsive.scss'

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
        <>
            {children}
        </>
        
    )
}