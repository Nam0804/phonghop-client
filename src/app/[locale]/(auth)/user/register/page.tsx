'use client'
import * as React from 'react';
import Button from '@/components/Form/Button';


export default function LoginPage() {
    const mystyle = {
        display: 'flex',
        width: '120px',
        height: '52px',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
        borderRadius: '8px',
        background:'#8B8B8B',
        color:'#FFF',
        fontFamily: 'Be Vietnam Pro',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal',
    };
    return (
        <>  
            <div>đã vào trang register</div>
            <Button label="Next" className='btn-primary' style={mystyle}></Button>
        </>
    );
}