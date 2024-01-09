'use client'
import React, { useState } from "react";
import Image from "next/image";
import Button from "../Form/Button";
import Modal from "../Modal/LogoutModal";
import styles from "./Header.module.css";
import Cookies from 'js-cookie';
import { useLocale, useTranslations  } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setLoading } from '@/lib/features/loadingSlice';
import api from '@/axiosService';
import {useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown} from 'react-bootstrap';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEnglish = () => {
    const hostname = document.location.href;
    window.location.href = hostname.replace('/vn/', '/en/');
  }
  const handleVietNam = () => {
    const hostnamev = document.location.href;
    window.location.href = hostnamev.replace('/en/', '/vn/');
  }
  const locale = useLocale();
  const loading = useAppSelector((state) => state.loading)
  const user = useSelector((state:any) => state.user.value);

  const username = user.name;
  const dispatch = useAppDispatch()
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const response = await api.post('auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`, 
        },
        credentials: 'include',
      });

      if (response.status === 200) {
        Cookies.remove('token');
        window.location.href = `/${locale}/login`;
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      dispatch(setLoading(false));
      closeModal();
    }
  };
  return (
    <>
      <div className={styles.header}>
        
        <div className={styles.logo}>
          <Image src="/logo.svg" alt="Logo" width={79} height={72} />
          <h2 className={styles.text}>Hello, {username}!</h2>
        </div>
        <div className={styles.btn}>
        {/* <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Chọn ngôn ngữ
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className={`${styles.lang} ${styles.customlang}`} onClick={handleEnglish}>
              <Image src="/england.svg" alt="England" width={24} height={24} />
              {' '}English
            </Dropdown.Item>

            <Dropdown.Item className={`${styles.lang} ${styles.customlang}`} onClick={handleVietNam}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 683" width="24" height="24">
            <g fill="#DA251D">
              <rect width="1024" height="683"/>
              <path d="M1024 0v136.6L887.4 0H1024zM1024 273.4V410L887.4 273.4H1024zM1024 547v136.6L887.4 547H1024z"/>
            </g>
            <g fill="#FFD100">
              <path d="M0 0h1024v182.4L832.4 0H0zM0 273.4h1024v136.6H0zM0 547h1024v136.6H0z"/>
            </g>
            <g fill="#464646">
              <path d="M0 182.4V273.4L364.6 0H0zM364.6 683l251-136.6V410H364.6zM364.6 410l-54 30-54-30V273.4L364.6 410zM364.6 682.8L0 409.6v-91.2L364.6 546.8V682.8zM314.6 410l-54 30-54-30V273.4L314.6 410zM314.6 682.8L250 648V547l64.6 35.2V682.8zM417.6 410l-54 30-54-30V273.4L417.6 410zM417.6 682.8L353 648V547l64.6 35.2V682.8zM520.6 410l-54 30-54-30V273.4L520.6 410zM520.6 682.8L456 648V547l64.6 35.2V682.8zM623.6 410l-54 30-54-30V273.4L623.6 410zM623.6 682.8L559 648V547l64.6 35.2V682.8zM726.6 410l-54 30-54-30V273.4L726.6 410zM726.6 682.8L662 648V547l64.6 35.2V682.8zM829.6 410l-54 30-54-30V273.4L829.6 410zM829.6 682.8L765 648V547l64.6 35.2V682.8zM932.6 410l-54 30-54-30V273.4L932.6 410zM932.6 682.8L868 648V547l64.6 35.2V682.8z"/>
            </g>
          </svg>
              {' '}Tiếng Việt
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
          <Button className={`${styles.lang} ${styles.customlang}`} label="English">
            <Image src="/england.svg" alt="England" width={24} height={24} />
          </Button>
          <Button className={`${styles.lang} ${styles.customlogout}`} onClick={openModal} label="Logout" />
        </div>

        
        {isModalOpen && (
          <Modal title="Are you sure to log out of the system?" onClose={closeModal}>
            <div className={styles.btngroup}>
              <Button className={styles.passbtn} onClick={handleLogout}>LOG OUT</Button>
              <Button color="#FFF" className={styles.closebtn} onClick={closeModal}>
                CANCEL
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Header;
