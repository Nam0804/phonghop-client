'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '@/constants/Form/Input';
import styles from 'cssPath/Login.module.css';
import DefaultLoginLayout from '@/layouts/User/DefaultLoginLayout';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Button from '@/constants/Form/Button';
import axios from 'axios';



const LoginPage: React.FC<{}> = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {     
      const postData = {
          email: email,
          password: password
        };
                
        axios.post(process.env.NEXT_PUBLIC_API_URL + 'auth/login', postData, { 
          withCredentials: false,
        })
          .then(response => {
          
            if(response)
            {
              console.log(response.data.data.token);
              Cookies.set('token', response.data.data.token);
              router.push('/');
            }else{
              console.error('Token not found')
            }
          })
          .catch(error => {
            if (error.response) {
              console.error('HTTP Error:', error.response.data);
            } else if (error.request) {
              console.error('No response received for the request.');
            } else {
              console.error('Error setting up the request or handling the response:', error.message);
            }
          });
    };
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };
    return (
      <DefaultLoginLayout>
        <>
            <div className={styles.inputform}>
                <div className={styles.input}>
                    {
                      !email && <img src="/mail.svg" alt="" className={styles.icon}/>
                    }
                    
                    <Input type="text" name="username" placeholder="Email" className={styles.inputsection} style={{marginBottom:'24px'}} onChange={(e:any) => setEmail(e.target.value)}></Input>
                </div>
                <div className={styles.input}>
                    <img src="/pass.svg" alt="" className={styles.icon}/>
                    <Input type="text" name="password" placeholder="Password" className={styles.inputsection} style={{marginBottom:'48px'}} onChange={(e:any) => setPassword(e.target.value)}></Input>
                </div>
                <div className={styles.forgot}>
                    <Checkbox onChange={onChange}>Remember me</Checkbox>
                    <Link href="/other-page" className={styles.customlink}>
                        Forgot password?
                    </Link>
                </div>
                <Button type="button" className={styles.loginbtn} onClick={handleLogin}>LOG IN</Button>
                <div className={styles.account}>
                    <p> Don&apos;t have an account? </p>
                    <Link href="/other-page2"  className={styles.customlink}>
                        Register
                    </Link>
                </div>
            </div>
        </>
      </DefaultLoginLayout>
    );
  };
export default LoginPage