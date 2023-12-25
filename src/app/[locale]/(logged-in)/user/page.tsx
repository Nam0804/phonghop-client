'use client'
import DeleteMeeting from "@/components/DeleteMeeting/DeleteMeeting";
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
            <DeleteMeeting availability={1} />
            <DeleteUser user_id={7} />
            <AddUser />
        </>
    );
}