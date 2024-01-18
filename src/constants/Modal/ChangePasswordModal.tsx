import React from "react";
import styles from'@/css/CompanyList.module.css';
import { useState } from "react";
import Button from "../ButtonDefault/Button";
import Modal from "@/constants/Modal/ProfileModal";
import customstyles from "@/constants/Modal/ChangeModal.module.css";

const ChangePasswordModal = ({ title, onClose, children,isOpen }:any) => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  
  const closeModal = () => {
    console.log('???');
        onClose();
  };
  return (
    <Modal title={title} onClose={closeModal} width="975">
      {
          <>
          <div className={styles.inputgroup}>
              <div className={styles.inputform1}>
                  <label htmlFor="name">Current Password*</label>
                  <img src="/pass.svg" alt="" className={customstyles.icon}/>
                  <input type={currentPasswordVisible ? 'text' : 'password'} name="password" placeholder="Password" className={customstyles.inputsection}/>
                  <img src={currentPasswordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={customstyles.showhide} onClick={()=>setCurrentPasswordVisible(!currentPasswordVisible)}/>
              </div>
              <div className={styles.inputform1}>
                  <label htmlFor="title">New Password*</label>
                  <img src="/pass.svg" alt="" className={customstyles.icon}/>
                  <input  type={newPasswordVisible ? 'text' : 'password'} name="password" placeholder="Password" className={customstyles.inputsection}/>
                  <img src={newPasswordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={customstyles.showhide} onClick={()=>setNewPasswordVisible(!newPasswordVisible)}/>
              </div>
              <div className={styles.inputform1} style={{ marginBottom:'50px' }}>
                  <label htmlFor="company">Confirm Password*</label>
                  <img src="/pass.svg" alt="" className={customstyles.icon}/>
                  <input  type={confirmNewPasswordVisible ? 'text' : 'password'} name="password" placeholder="Password" className={customstyles.inputsection}/>
                  <img src={confirmNewPasswordVisible ? "/showpass.svg" : "/hidepass.svg"} alt="" className={customstyles.showhide} onClick={()=>setConfirmNewPasswordVisible(!confirmNewPasswordVisible)}/>
              </div>
          </div>
          <div className={styles.btngroup}>
              <Button className={styles.passbtn}>SAVE</Button>
              <Button color="#FFF" className={styles.closebtn} onClick={closeModal}>CLOSE</Button>
          </div>
      </>
      }
      </Modal>
  );
};
export default ChangePasswordModal;
