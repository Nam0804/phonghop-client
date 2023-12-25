'use client'
import { useState } from 'react';
import ManagerEditInfor from "@/components/Manager/ManagerEditInfor";


export default function Index() {
    const [getDemo, setDemo] = useState(false);

    const handleClick = () => {
        setDemo(!getDemo);
    }

    return (
        <ManagerEditInfor user={{
            id:'6',
            company: 'FPT Company',
            managerName: 'staff4',
            title: 'Manager',
            email:'staff4@gmail.com',
            phone: '3235253235'
        }}/>
    );
}