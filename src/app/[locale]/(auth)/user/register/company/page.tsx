'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '@/constants/Form/Input';
import styles from '@/css/CompanyRegister.module.css';
import DefaultLoginLayout from '@/layouts/User/DefaultLoginLayout';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Button from '@/constants/Form/Button';
import axios from 'axios';


export default function RegisterNewCompany(){
   return (
    
    <DefaultLoginLayout>
        <>
        <div className="">
            <div className={styles.registerTitle}>Register Company Account</div>
            <div className='register-sub'>Please input your company information.</div>
        </div>
        </>
    </DefaultLoginLayout>
   );
};
