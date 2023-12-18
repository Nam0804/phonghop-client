'use client'
import ButtonComponent from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function Index() {
  const [getDemo, setDemo] = useState(false);

  const handleClick = () => {
    setDemo(!getDemo);
  }
  const dispatch = useDispatch();

  return (
    <DefaultLayout>
        <h1>Xin chào tôi là An</h1>
    </DefaultLayout>
  );
}