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
import Modal from '@/constants/Modal/FirstLogModal'
import { toast } from 'react-hot-toast';
import api from '@/axiosService';
import { useLocale, useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/hooks';
import { setLoading } from '@/lib/features/loadingSlice';
import { initializeUser } from '@/lib/features/user/userSlice';
import { useSelector } from 'react-redux';

const LoginPage: React.FC<{}> = () => {

  const t = useTranslations('Login');
  const locale = useLocale();
  const router = useRouter()
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
      dispatch(setLoading(true));
      const res = await api.post('auth/login', postData)
      toast.success(t('success'));
      Cookies.set('token', res.data.data.token);

      const user = res.data.data.user;
      dispatch(initializeUser(user));
      const usertype = user.type;
      if (usertype === 1 || usertype === 2 || usertype === 3) {
        router.push(`/${locale}/room`);
      }
      if(usertype === 0){
      router.push(`/${locale}/company`)
      }
    } catch (error) {
      console.log(error);
      toast.error(t('error'));
    } finally {
      dispatch(setLoading(false));
    }
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <Link href="/vn/register" className={styles.customlink}>
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
                      <input type={passwordVisible ? 'text' : 'password'} name="password" className={styles.inputsection} placeholder="Password*" />
                      <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide2} onClick={() => setpasswordVisible(!passwordVisible)} />
                    </div>
                    <div className={styles.inputform1}>
                      <img src="/pass.svg" alt="" className={styles.icon1} />
                      <input type={passwordVisible ? 'text' : 'password'} name="password" className={styles.inputsection} placeholder="Confirm Password*" />
                      <img src={passwordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={styles.showhide2} onClick={() => setpasswordVisible(!passwordVisible)} />
                    </div>
                  </div>
                  <div className={styles.btngroup}>
                    <Button className={styles.passbtn} onClick={closeModal}>CHANGE PASSWORD</Button>
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