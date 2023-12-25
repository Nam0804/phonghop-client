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
            user_id: '6',
            company: 'company1',
            managerName: 'manager1',
            title: 'Manager',
            email:'manager1@gmail.com',
            phone: '3235253235'
        }}/>
    );
}