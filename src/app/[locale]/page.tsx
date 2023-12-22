'use client'
import DeleteUser from '@/components/User/deleteUser/deleteUser';
import ButtonComponent from '@/constants/Button/Button';
import Header from '@/constants/Header/Header';
import Sidebar from '@/constants/Sidebar/Sidebar';
import DefaultLayout from '@/layouts/User/DefaultLayout';
import { useState } from 'react';


export default function Index() {
  const [getDemo, setDemo] = useState(false);

  const handleClick = () => {
    setDemo(!getDemo);
  }

  return (
    <DefaultLayout>
        <DeleteUser user_id={10}/>
    </DefaultLayout>
  );
}