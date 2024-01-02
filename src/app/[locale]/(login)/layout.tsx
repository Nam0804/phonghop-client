'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/css/DefaultLoginLayout.module.css';
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import SpinFC from 'antd/es/spin';
import { useAppSelector } from '@/redux/hooks';
import { get } from 'lodash';

const locales = ['en', 'vn'];

const DefaultLoginLayout = ({ children, params: { locale } }: any) => {

  const loading: any = useAppSelector((state) => get(state, 'loading', false));

  if (!locales.includes(locale as any)) notFound();

  return (
    <SpinFC spinning={!!loading.value ? loading : false}>
      <div className={styles.container}>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <img src='/assets/images/Turtorial1.png' width={'100%'} height={'900px'} alt="Tutorial" />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <div className={styles.customStyle}>
              <img src='/assets/images/Layer_1.png' style={{ marginTop: '52px' }}></img>
              <Toaster position="top-right" />
              {children}
            </div>
          </div>
        </div>
      </div>
    </SpinFC>
  );
};
export default DefaultLoginLayout;
