'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/css/DefaultLoginLayout.module.css';



    const DefaultLoginLayout = ({ children }:any) => {      
        return (
          <div className={styles.container}>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <img src='/assets/images/Turtorial1.png' width={'100%'} height={'900px'} alt="Tutorial" />
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className={styles.customStyle}>
                    <img src='/assets/images/Layer_1.png' style={{marginTop:'52px'}}></img>
                    {children}
                </div>
              </div>
            </div>
          </div>
        );
    };
    export default DefaultLoginLayout;
