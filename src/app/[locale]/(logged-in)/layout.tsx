import StoreProvider from '@/providers/StoreProvider';
import Header from '@/constants/Header/Header';
import Sidebar from '@/constants/Sidebar/Sidebar';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { Toaster } from "react-hot-toast";
import { useAppSelector } from '@/lib/hooks';


// Can be imported from a shared config
const locales = ['en', 'vn'];

export default function LocaleLayout({ children, params: { locale } }: any) {

  const messages = useMessages();

  if (!locales.includes(locale as any)) notFound();

  return (
    <>
      <header>
        <Header></Header>
      </header>
      <div style={{ width: '80px', float: 'left', height: '100%' }}>
        <Sidebar></Sidebar>
      </div>
      <section style={{ width: 'calc(100% - 80px)', float: 'right' }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Toaster position="top-right" />
            {children}
        </NextIntlClientProvider>
      </section>
    </>
  );
}