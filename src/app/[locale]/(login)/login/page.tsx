'use client'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '@/constants/Form/Input';
import styles from '@/css/Login.module.css';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Button from '@/constants/Form/Button';
import axios from 'axios';
import Modal from '@/constants/Modal/FirstLogModal'



const LoginPage: React.FC<{}> = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
      const postData = {
          email: email,
          password: password
        };
        
        const headers = {
          'Accept': 'application/vnd.api+json',
        };
        
        axios.post(process.env.API_URL + 'auth/login', postData, { headers: headers })
          .then(response => {
          
            if(response)
            {
              console.log(response.data.data.token);
              // Cookies.set('token', response.data.data.token);
              // router.push('/company');
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(true);

    const someAsyncFunction = async () => {
      return { isFirstTimeLogin: true }; 
    };
    

    useEffect(() => {
      const checkFirstTimeLogin = async () => {
        try {
          const response = await someAsyncFunction(); 
  
          if (response.isFirstTimeLogin) {
            setIsModalOpen(true);
          }
        } catch (error) {
          console.error('Error checking first-time login:', error);
        }
      };
  
      checkFirstTimeLogin();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleButtonClick = () => {
      handleLogin();
      openModal();
    };
    const [passwordVisible, setpasswordVisible] = useState(false);
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };
    return (
        <>
            <div className={styles.inputform}>
                <div className={styles.input}>
                    <img src="/mail.svg" alt="" className={styles.icon}/>
                    <Input type="text" name="username" placeholder="Email" className={styles.inputsection} style={{marginBottom:'24px'}} onChange={(e:any) => setEmail(e.target.value)}></Input>
                </div>
                <div className={styles.input}>
                    <img src="/pass.svg" alt="" className={styles.icon}/>
                    <Input  type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" className={styles.inputsection} style={{marginBottom:'48px'}} onChange={(e:any) => setPassword(e.target.value)}></Input>
                    <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={()=>setpasswordVisible(!passwordVisible)}/>
                </div>
                <div className={styles.forgot}>
                    <Checkbox onChange={onChange}>Remember me</Checkbox>
                    <Link href="/other-page" className={styles.customlink}>
                        Forgot password?
                    </Link>
                </div>
                <Button type="button" className={styles.loginbtn} onClick={handleButtonClick}>LOG IN</Button>
                <div className={styles.account}>
                    <p>Don't have an account?</p>
                    <Link href="/other-page2"  className={styles.customlink}>
                        Register
                    </Link>
                </div>
                <div>
                  {isModalOpen && (
                      <Modal title="Kindly change your password for first time log in." onClose={closeModal} >
                      {
                          <>
                          <div className={styles.inputgroup}>
                              <div className={styles.inputform1}>
                                  <img src="/pass.svg" alt="" className={styles.icon1}/>
                                  <input  type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password"/>
                                  <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={()=>setpasswordVisible(!passwordVisible)}/>
                              </div>
                              <div className={styles.inputform1}>
                                  <img src="/pass.svg" alt="" className={styles.icon1}/>
                                  <input  type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password"/>
                                  <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={()=>setpasswordVisible(!passwordVisible)}/>
                              </div>
                          </div>
                          <div className={styles.btngroup}>
                              <Button className={styles.passbtn}>SAVE</Button>
                              <Button color="#FFF" className={styles.closebtn} onClick={closeModal}>CLOSE</Button>
                          </div>

                      </>
                      }
                      </Modal>
                  )}
                  </div>
            </div>
        </>
    );
  };
export default LoginPage