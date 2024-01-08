'use client'
import { useState } from 'react';
import UserEditInfor from 'src/components/User/editInfor/UserEditInfor';
import { useSelector } from 'react-redux';

export default function Index() {
    const [getDemo, setDemo] = useState(false);
    const user = useSelector((state) => state.user.value);
    const handleClick = () => {
        setDemo(!getDemo);
    }

    return (
        <>
            <UserEditInfor user ={user}/>
        </>
    );
}