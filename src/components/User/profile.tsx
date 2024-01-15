'use client'
import React, { useState, useEffect, useRef, use } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useGetApiProfileQuery } from '@/lib/services/profileApi';
import { selectApiProfileData } from "@/lib/slices/profileSlice";
import Modal from "@/constants/Modal/ProfileModal";
import Button from "@/constants/Form/Button";
import styles from "@/constants/Sidebar/Sidebar.module.css";

export default function Profile({ togglePopup }: { togglePopup: any }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    togglePopup();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  var apiSliceProfile = useSelector((state: any) => state.user.value);
  var usertype= apiSliceProfile.type;
  console.log(apiSliceProfile);
  const [userData, setUserData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
  })
  useEffect(() => {
    if (apiSliceProfile && usertype == 0) {
      const initialData = {
        name: apiSliceProfile.name,
        email: apiSliceProfile.email,
        phone: apiSliceProfile.phone,
      };
      setUserData(initialData);
    }
    if (apiSliceProfile && usertype == 1) {
      const initialData = {
        name: apiSliceProfile.name,
        title: apiSliceProfile.title,
        email: apiSliceProfile.email,
        phone: apiSliceProfile.phone,
        company: apiSliceProfile.company.company_name,
      };
      setUserData(initialData);
    }
  }, [apiSliceProfile]);


  return (
    <>
    {usertype === 0 && (<>
        <Modal title="Personal Information" width={1000} height={1000} onClose={handleClose}>
        <div className={styles.inputform}>
          <label htmlFor="name">Name*</label>
          <input type="text" id="name" value={userData.name} disabled/>
        </div>
        <div className={styles.inputform}>
          <label htmlFor="email">Email Address*</label>
          <input type="email" id="email" value={userData.email} disabled/>
        </div>
        <div className={styles.inputform}>
          <label htmlFor="phone">Phone Number*</label>
          <input type="text" id="phone" value={userData.phone} disabled/>
        </div>
        <div className={styles.editsection}>
          <button className={styles.editbtn}>EDIT INFORMATION</button>
        </div>
        <div className={styles.btngroup}>
          <Button className={styles.passbtn}>CHANGE PASSWORD</Button>
          <Button color="#FFF" className={styles.closebtn} onClick={handleClose}>
            CLOSE
          </Button>
        </div>
          </Modal>
      </>)}
      {usertype === 1 && (
      <>
        <Modal title="Personal Information" onClose={handleClose}><div className={styles.inputform}>
          <label htmlFor="name">Manager Name*</label>
          <input type="text" id="name" value={userData.name} />
        </div>
          <div className={styles.inputform}>
            <label htmlFor="title">Manager Title*</label>
            <input type="text" id="title" value={userData.title} />
          </div>
          <div className={styles.inputform}>
            <label htmlFor="company">Company*</label>
            <input type="text" id="company" value={userData.company} />
          </div>
          <div className={styles.inputform}>
            <label htmlFor="email">Email Address*</label>
            <input type="email" id="email" value={userData.email}/>
          </div>
          <div className={styles.inputform}>
            <label htmlFor="phone">Phone Number*</label>
            <input type="text" id="phone" value={userData.phone} />
          </div>
          <div className={styles.editsection}>
          <button className={styles.editbtn}>EDIT INFORMATION</button>
        </div>
        <div className={styles.btngroup}>
          <Button className={styles.passbtn}>CHANGE PASSWORD</Button>
          <Button color="#FFF" className={styles.closebtn} onClick={handleClose}>
            CLOSE
          </Button>
        </div>
          </Modal>
      </>)}
    </>

  )
}




