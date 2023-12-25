'use client'
import DeleteUser from "@/components/User/deleteUser/deleteUser";
import { useState } from 'react';
import AddUser from "@/components/User/addUser/addUser";


export default function Index() {
    const [getDemo, setDemo] = useState(false);

    const handleClick = () => {
        setDemo(!getDemo);
    }

    return (
        <>
            <DeleteUser user_id={7} />
            <AddUser />
        </>
    );
}