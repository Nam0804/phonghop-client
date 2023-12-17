import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";
import { useState } from "react";
import Modal from "@/components/Modal/StaffDetailModal";
import Button from "@/components/ButtonDefault/Button";
import styles from "./DefaultLayout.module.css"
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
        <Modal title="Staff Detail Information" onClose={closeModal} >
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
                <label htmlFor="email">Email*</label>
                <input type="email" id="email" />
              </div>
              <div className={styles.inputform}>
                <label htmlFor="phone">Phone Number*</label>
                <input type="text" id="phone" />
              </div>
              <div className={styles.btngroup}>
                <Button className={styles.closebtn} onClick={closeModal}>CLOSE</Button>
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
