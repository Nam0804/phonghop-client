import Header from "@/constants/Header/Header";
import Sidebar from "@/constants/Sidebar/Sidebar";
import React from "react";
import { useState } from "react";
import Modal from "@/constants/Modal/ViewModal";
import styles from"@/css/DefaultLayout.module.css";
import Button from "@/constants/Form/Button";
const DefaultLayout = ({children}:any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
    return (
    <div>
      <header>
        <Header></Header>
      </header>
      <div style={{width:'80px',float:'left'}}>
        <Sidebar></Sidebar>
      </div>
      <section style={{width:'calc(100% - 80px)',float:'right'}}>
        {children}
        <button onClick={openModal}>Open Modal</button>
        {isModalOpen && (
        <Modal title="Personal Information" onClose={closeModal} >
          {
            <>
              <div className={styles.inputform}>
                <label htmlFor="name">Name*</label>
                <input type="text" id="name" />
              </div>
              <div className={styles.inputform}>
                <label htmlFor="title">Title*</label>
                <input type="text" id="title" />
              </div>
              <div className={styles.inputform}>
                <label htmlFor="company">Company*</label>
                <input type="text" id="company" />
              </div>
              <div className={styles.inputform}>
                <label htmlFor="email">Email Address*</label>
                <input type="email" id="email" />
              </div>
              <div className={styles.inputform}>
                <label htmlFor="phone">Phone Number*</label>
                <input type="text" id="phone" />
              </div>
              <div className={styles.editsection}>
                <button className={styles.editbtn}>EDIT INFORMATION</button>
              </div>
              <div className={styles.btngroup}>
                <Button className={styles.passbtn}>CHANGE PASSWORD</Button>
                <Button color="#FFF" className={styles.closebtn} onClick={closeModal}>CLOSE</Button>
              </div>
          </>
          }
        </Modal>
      )}
      </section>
      
    </div>
    );
}
export default DefaultLayout
