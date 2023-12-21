'use client'
import DefaultLayout from '@/layouts/User/DefaultLayout';
import { useState } from 'react';


export default function Index() {
  const [getDemo, setDemo] = useState(false);

  const handleClick = () => {
    setDemo(!getDemo);
  }

  return (
    <DefaultLayout>

    </DefaultLayout>
  );
}