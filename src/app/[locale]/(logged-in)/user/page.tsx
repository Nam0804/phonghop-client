'use client'
import { useState } from 'react';
import DeleteMeeting from "@/components/DeleteMeeting/DeleteMeeting";


export default function Index() {
    const [getDemo, setDemo] = useState(false);

    const handleClick = () => {
        setDemo(!getDemo);
    }

    return (
       <DeleteMeeting availability={1}/>
    );
}