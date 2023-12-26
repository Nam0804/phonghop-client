'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/css/DefaultLoginLayout.module.css';
import StoreProvider from '@/providers/StoreProvider';

const locales = ['en', 'vn'];

const DefaultLoginLayout = ({ children, params: { locale } }: any) => {

  return (
    <html lang={locale}>
      <body>
        <div className={styles.container}>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <img src='/assets/images/Turtorial1.png' width={'100%'} height={'900px'} alt="Tutorial" />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <div className={styles.customStyle}>
                <img src='/assets/images/Layer_1.png' style={{ marginTop: '52px' }}></img>
                <StoreProvider>
                  {children}
                </StoreProvider>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
export default DefaultLoginLayout;
