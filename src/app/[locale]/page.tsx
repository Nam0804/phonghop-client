'use client'
import ButtonComponent from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useState } from 'react';

export default function Index() {
  const [getDemo, setDemo] = useState(false);

  const handleClick = () => {
    setDemo(!getDemo);
  }
  return (
    <DefaultLayout>
        <h1>Xin chào tôi là An</h1>
    </DefaultLayout>
  );
}