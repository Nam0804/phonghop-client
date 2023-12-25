'use client'
import { useState } from 'react';
import DeleteUser from "@/components/User/deleteUser/deleteUser";


export default function Index() {
    const [getDemo, setDemo] = useState(false);

    const handleClick = () => {
        setDemo(!getDemo);
    }

    return (
        <DeleteUser user_id={7}/>
    );
}