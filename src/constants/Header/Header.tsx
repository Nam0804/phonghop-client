'use client'
import React, { useState } from "react";
import Image from "next/image";
import Button from "../Form/Button";
import Modal from "../Modal/LogoutModal";
import styles from "./Header.module.css";


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    
    window.location.href = '/vn/user/login';

    closeModal();
  };
  return (
    <>
      <div className={styles.header}>
        
        <div className={styles.logo}>
          <Image src="/logo.svg" alt="Logo" width={79} height={72} />
          <h2 className={styles.text}>Hello, Manager!</h2>
        </div>

        
        <div className={styles.btn}>
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
