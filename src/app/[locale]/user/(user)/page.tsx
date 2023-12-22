'use client'
import DefaultLayout from '@/layouts/User/DefaultLayout';
import { useState } from 'react';
import AddUser from "@/components/User/addUser/addUser";


export default function Index() {
    const [getDemo, setDemo] = useState(false);

    const handleClick = () => {
        setDemo(!getDemo);
    }

    return (
        <DefaultLayout>
            <AddUser/>
        </DefaultLayout>
    );
}