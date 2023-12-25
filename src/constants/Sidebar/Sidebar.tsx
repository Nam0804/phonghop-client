'use client'
import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/constants/Form/Button";
import { useState, useEffect } from "react";
import Modal from "@/constants/Modal/ViewModal";
const Sidebar = () => {
  const [userData, setUserData] = useState<{ type?: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/1");
        const data = await response.json();
        setUserData(data);
    
        if (data.type === 2) {
          openModal("Staff");
        } else if (data.type === 1) {
          openModal("Manager");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchData();
  }, []);

  const openModal = (type: string) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.listsidebar}>
        <li className={styles.sidebarItem}>
          <Image src="/company.svg" alt="Company logo" width={'32'} height={'32'} />
          <Link href={"/company"} style={{textDecoration:'none'}} className={styles.sidebarText}>Company</Link>
        </li>
        <li className={styles.sidebarItem}>
          <Image src="/room.svg" alt="Room logo" width={'32'} height={'32'}/>
          <a href="/home" className={styles.sidebarText}>Room</a>
        </li>
        <li className={styles.sidebarItem}>
          <Image src="/booking.svg" alt="Booking logo" width={'32'} height={'32'}/>
          <a href="/users" className={styles.sidebarText}>Booking</a>
        </li>
        <li className={styles.sidebarItem}>
          <Image src="/user.svg" alt="User logo" width={'32'} height={'32'}/>
          <a href="/products" className={styles.sidebarText}>Users</a>
        </li>
      </ul>
      <div>
        <div className={styles.sidebarItem2}>
            <Image src="/book.png" alt="Book logo" width={'32'} height={'32'}/>
            <a className={styles.sidebarText} onClick={() => openModal("Username")}>Username</a>
        </div>
        {isModalOpen && (
          <Modal title="Personal Information" onClose={closeModal}>
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
          </Modal>
        )}

      </div>
    </aside>
  );
};

export default Sidebar;