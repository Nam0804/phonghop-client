'use client'
import { useState } from 'react';
// import ManagerEditInfor from "@/components/Manager/ManagerEditInfor";


export default function Index() {
    const [getDemo, setDemo] = useState(false);

    const handleClick = () => {
        setDemo(!getDemo);
    }

    return (
        <></>
    );
}