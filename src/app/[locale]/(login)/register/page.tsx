'use client'
import * as React from 'react';
import Button from '@/constants/Form/Button';
import Input from '@/constants/Form/Input';
import styles from '@/css/Register.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterPage = () => {

    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isRePasswordVisible, setRePasswordVisibility] = useState(false);
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const isFormValid = input1 !== '' && input2 !== '' && input3 !== '' && input4 !== '' && input5 !== '' && input6 !== '';
    // const handleRegistration = () => {
    //     const userData = {
    //       name: input1,
    //       title: input2,
    //       email: input3,
    //       phone: input4,
    //       password: input5,
    //       confirmPassword: input6,
    //       company_id:1
    //     };
    //     console.log(userData)
    //     axios
    //     .post('http://localhost:8000/api/users', userData, {
    //       headers: {
    //         Authorization: 'Bearer 34|SJrxVEn6FBLtlsM9pO08LRElSUw4LkhIiP0pEODg022b32f7',
    //       },
    //     })
    //     .then(response => {
    //       console.log(userData);
    //       console.log(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Registration failed:', error);
    //     });
        
    //   };
    return (
            <>
                <div className={styles.content}>
                    <h3>Register New Account</h3>
                    <p>Please input your information</p>
                    <div className={styles.input}>
                        <img src="/userlogin.svg" alt="" className={styles.icon}/>
                        <Input type="text" name="fullname" placeholder="Full Name*" className={styles.inputsection} onChange={(e:any) => setInput1(e.target.value)} value={input1}></Input>
                    </div>
                    <div className={styles.input}>
                        <img src="/title.svg" alt="" className={styles.icon}/>
                        <Input type="text" name="title" placeholder="Title*" className={styles.inputsection} onChange={(e:any) => setInput2(e.target.value)} value={input2}></Input>
                    </div>
                    <div className={styles.input}>
                        <img src="/mail.svg" alt="" className={styles.icon}/>
                        <Input type="text" name="email" placeholder="Email*" className={styles.inputsection} onChange={(e:any) => setInput3(e.target.value)} value={input3}></Input>
                    </div>
                    <div className={styles.input}>
                        <img src="/phone.svg" alt="" className={styles.icon}/>
                        <Input type="text" name="phone" placeholder="Phone*" className={styles.inputsection} onChange={(e:any) => setInput4(e.target.value)} value={input4}></Input>
                    </div>
                    <div className={styles.input}>
                        <img src="/pass.svg" alt="" className={styles.icon}/>
                        <Input type={isPasswordVisible ? 'text' : 'password'} name="password" placeholder="Password*" className={styles.inputsection} onChange={(e:any) => setInput5(e.target.value)} value={input5}></Input>
                        <img src={isPasswordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={()=>setPasswordVisibility(!isPasswordVisible)}/>
                    </div>
                    <div className={styles.input}>
                        <img src="/pass.svg" alt="" className={styles.icon}/>
                        <Input type={isRePasswordVisible ? 'text' : 'password'} name="confirmpassword" placeholder="Confirm Password*" className={styles.inputsection} onChange={(e:any) => setInput6(e.target.value)} value={input6}></Input>
                        <img src={isRePasswordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={()=>setRePasswordVisibility(!isRePasswordVisible)}/>
                    </div>
                </div>
                <div className={styles.btnsection}>
                    <Button style={{ backgroundColor: isFormValid ? '#225560' : '#8B8B8B' }} className={styles.createbtn}>CREATE ACCOUNT</Button>
                    <Button className={styles.cancelbtn}>CANCEL</Button>
                </div>
                <div className={styles.progressbar}>

                </div>
            </> 
    );
}

export default RegisterPage