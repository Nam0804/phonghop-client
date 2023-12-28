'use client'
import React, { useState, useEffect, useRef, use } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useGetApiProfileQuery } from '@/redux/services/profileApi';
import { selectApiProfileData } from "@/redux/slices/profileSlice";
import Modal from "@/constants/Modal/ProfileModal";
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
  const [userData, setUserData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    type: 0,
  })

  useEffect(() => {
    if (apiSliceProfile) {
      const initialData = {
        name: apiSliceProfile.data.data.attributes.name,
        title: apiSliceProfile.data.data.attributes.title,
        company: apiSliceProfile.data.data.relationships.company.data.company_name,
        email: apiSliceProfile.data.data.attributes.email,
        phone: apiSliceProfile.data.data.attributes.phone,
        type: apiSliceProfile.data.data.attributes.type,
      };

      // Update the state with the initial data
      setUserData(initialData);
    }
  }, [apiSliceProfile]);
  const dispatch = useDispatch();
  console.log(apiSliceProfile);


  return (
    <>
      <div>kakakak</div>
      {userData.type === 2 ? (<>
        <Modal title="Personal Information" width={1000} height={1000} onClose={handleClose}><div className={styles.inputform}>
          <label htmlFor="name">Name*</label>
          <input type="text" id="name" value={userData.name}/>
        </div>
          <div className={styles.inputform}>
            <label htmlFor="title">Title*</label>
            <input type="text" id="title" value={userData.title}/>
          </div>
          <div className={styles.inputform}>
            <label htmlFor="company">Company*</label>
            <input type="text" id="company"value={userData.company} />
          </div>
          <div className={styles.inputform}>
            <label htmlFor="email">Email Address*</label>
            <input type="email" id="email" value={userData.email}/>
          </div>
          <div className={styles.inputform}>
            <label htmlFor="phone">Phone Number*</label>
            <input type="text" id="phone" value={userData.phone}/>
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
      </>) : (<>
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




