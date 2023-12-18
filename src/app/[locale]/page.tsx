'use client'
import ButtonComponent from '@/constants/Button/Button';
import Header from '@/constants/Header/Header';
import Sidebar from '@/constants/Sidebar/Sidebar';
import DefaultLayout from '@/layouts/User/DefaultLayout';
import { useState } from 'react';
>>>>>>> 80d8ad50d4ef0b35053b9eb47680f00b73761391


export default function Index() {
  const [getDemo, setDemo] = useState(false);

  const handleClick = () => {
    setDemo(!getDemo);
  }

  return (
    <DefaultLayout>
        <AddUser />
        <DeleteUser />
    </DefaultLayout>
  );
}