'use client'
import * as React from 'react';
import Button from '@/components/Form/Button';
import DefaultLoginLayout from '@/layouts/DefaultLoginLayout';
import Input from '@/components/Form/Input';
import styles from './Register.module.css';


const RegisterPage = () => {
    return (
        <DefaultLoginLayout>
            <>
                <div className={styles.content}>
                    <h3>Register New Account</h3>
                    <p>Please input your information</p>
                    <div className={styles.input}>
                        <img src="/userlogin.svg" alt="" className={styles.icon}/>
                        <Input type="text" name="fullname" placeholder="Full Name*" className={styles.inputsection} ></Input>
                    </div>
                    <div className={styles.input}>
                        <img src="/title.svg" alt="" className={styles.icon}/>
                        <Input type="text" name="title" placeholder="Title*" className={styles.inputsection} ></Input>
                    </div>
                    <div className={styles.input}>
                        <img src="/mail.svg" alt="" className={styles.icon}/>
                        <Input type="text" name="email" placeholder="Email*" className={styles.inputsection} ></Input>
                    </div>
                    <div className={styles.input}>
                        <img src="/phone.svg" alt="" className={styles.icon}/>
                        <Input type="text" name="username" placeholder="Email" className={styles.inputsection} ></Input>
                    </div>
                    <div className={styles.input}>
                        <img src="/pass.svg" alt="" className={styles.icon}/>
                        <Input type="password" name="password" placeholder="Password*" className={styles.inputsection} ></Input>
                        <img src="/hidepass.svg" alt="" className={styles.showhide} />
                    </div>
                    <div className={styles.input}>
                        <img src="/pass.svg" alt="" className={styles.icon}/>
                        <Input type="password" name="confirmpassword" placeholder="Confirm Password*" className={styles.inputsection} ></Input>
                        <img src="/hidepass.svg" alt="" className={styles.showhide}/>

                    </div>
                </div>
                <div className={styles.btnsection}>
                    <Button className={styles.createbtn}>CREATE ACCOUNT</Button>
                    <Button className={styles.cancelbtn}>CANCEL</Button>
                </div>
                <div className={styles.progressbar}>

                </div>
            </> 
        </DefaultLoginLayout>
    );
}
export default RegisterPage