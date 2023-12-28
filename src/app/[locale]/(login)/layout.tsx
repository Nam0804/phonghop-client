import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/css/DefaultLoginLayout.module.css';
import StoreProvider from '@/providers/StoreProvider';
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { Spin } from 'antd';
import SpinFC from 'antd/es/spin';
import { useAppSelector } from '@/lib/hooks';

const locales = ['en', 'vn'];

const DefaultLoginLayout = ({ children, params: { locale } }: any) => {

  const messages = useMessages();

  const loading = useAppSelector((state) => state.loading)

  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body>
        <SpinFC spinning={loading}>
          <div className={styles.container}>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <img src='/assets/images/Turtorial1.png' width={'100%'} height={'900px'} alt="Tutorial" />
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className={styles.customStyle}>
                  <img src='/assets/images/Layer_1.png' style={{ marginTop: '52px' }}></img>
                  <NextIntlClientProvider locale={locale} messages={messages}>
                    <StoreProvider>
                      <Toaster position="top-right" />
                      {children}
                    </StoreProvider>
                  </NextIntlClientProvider>
                </div>
              </div>
            </div>
          </div>
        </SpinFC>
      </body>
    </html>
  );
};
export default DefaultLoginLayout;
