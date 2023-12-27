'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useGetApiProfileQuery } from '@/redux/services/profileApi';
import { selectApiProfileData } from "@/redux/slices/profileSlice";
import Modal from "@/constants/Modal/ViewModal";
import Button from "@/constants/Form/Button";
import styles from "@/constants/Sidebar/Sidebar.module.css";
import Cookies from 'js-cookie';
import { Providers } from "@/redux/provider"



export default function Profile({ togglePopup }: { togglePopup: any }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    togglePopup();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  // const tokenLoggedInCookie = Cookies.get('loggedToken');
  const tokenLoggedInCookie = '1|fuRzoN8I21qKIBQD7PErHHTXe5F5q1rkFix0wWN23778516e'
  var { data: apiProfileToken, isLoading, isError } = useGetApiProfileQuery(tokenLoggedInCookie || '');
  var apiSliceProfile = useSelector(selectApiProfileData);
  const dispatch = useDispatch();
  console.log(apiSliceProfile);


  return (
    <>
      <div>KAKAKAKAK</div>
      {/* <Modal title="Personal Information" onClose={handleClose}>
        {userData.type === 2 ? (
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
          </>
        ) : (
          <>
            <div className={styles.inputform}>
              <label htmlFor="name">Manager Name*</label>
              <input type="text" id="name" />
            </div>
            <div className={styles.inputform}>
              <label htmlFor="title">Manager Title*</label>
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
          </>
        )}
        <div className={styles.editsection}>
          <button className={styles.editbtn}>EDIT INFORMATION</button>
        </div>
        <div className={styles.btngroup}>
          <Button className={styles.passbtn}>CHANGE PASSWORD</Button>
          <Button color="#FFF" className={styles.closebtn} onClick={closeModal}>
            CLOSE
          </Button>
        </div>
      </Modal> */}
    </>

  )
}




