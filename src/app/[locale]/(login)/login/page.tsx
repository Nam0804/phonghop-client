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
import { toast } from 'react-hot-toast';
import api from '@/axiosService';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setLoading } from '@/lib/features/loadingSlice';



const LoginPage: React.FC<{}> = () => {

  const t = useTranslations('Login');
  const locale = useLocale();
  const router = useRouter()
  const loading = useAppSelector((state) => state.loading)
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isFormValid = email !== '' && password !== '';
  const handleLogin = async () => {
    const postData = {
      email: email,
      password: password
    };

    try {
      const res = await api.post('auth/login', postData)

      dispatch(setLoading(true));
      toast.success(t('success'));
      Cookies.set('token', res.data.data.token);
      dispatch(setLoading(false));
      router.push(`/${locale}`)

    } catch (error) {
      console.log(error);
      toast.error(t('error'));
    }
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
          <img src="/mail.svg" alt="" className={styles.icon} />

          <Input type="text" name="username" placeholder="Email" className={styles.inputsection} style={{ marginBottom: '24px' }} onChange={(e: any) => setEmail(e.target.value)} value={email}></Input>        </div>
        <div className={styles.input}>
          <img src="/pass.svg" alt="" className={styles.icon} />
          <Input type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" className={styles.inputsection} style={{ marginBottom: '48px' }} onChange={(e: any) => setPassword(e.target.value)} value={password}></Input>          <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={() => setpasswordVisible(!passwordVisible)} />
        </div>
        <div className={styles.forgot}>
          <Checkbox onChange={onChange}>Remember me</Checkbox>
          <Link href="/other-page" className={styles.customlink}>
            Forgot password?
          </Link>
        </div>

        <Button type="button" className={styles.loginbtn} onClick={handleButtonClick} style={{ backgroundColor: isFormValid ? '#225560' : '#8B8B8B' }}>LOG IN</Button>        <div className={styles.account}>
          <p>Don't have an account?</p>
          <Link href="/vn/register"  className={styles.customlink}>
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
                      <img src="/pass.svg" alt="" className={styles.icon1} />
                      <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" />
                      <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={() => setpasswordVisible(!passwordVisible)} />
                    </div>
                    <div className={styles.inputform1}>
                      <img src="/pass.svg" alt="" className={styles.icon1} />
                      <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" />
                      <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide} onClick={() => setpasswordVisible(!passwordVisible)} />
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