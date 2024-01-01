'use client'
import Header from '@/constants/Header/Header';
import Sidebar from '@/constants/Sidebar/Sidebar';
import { useAppSelector } from '@/redux/hooks';
import SpinFC from 'antd/es/spin';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { Toaster } from "react-hot-toast";

// Can be imported from a shared config
const locales = ['en', 'vn'];

export default function LocaleLayout({ children, params: { locale } }: any) {

  const loading = useAppSelector((state) => state.loading)

  if (!locales.includes(locale as any)) notFound();

  return (
    <SpinFC spinning={!!loading.value ? loading : false}>
      <header>
        <Header></Header>
      </header>
      <div style={{ width: '80px', float: 'left', height: '100%' }}>
        <Sidebar></Sidebar>
      </div>
      <section style={{ width: 'calc(100% - 80px)', float: 'right' }}>
        <Toaster position="top-right" />
        {children}
      </section>
    </SpinFC>
  );
}