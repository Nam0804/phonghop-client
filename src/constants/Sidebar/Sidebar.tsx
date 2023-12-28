'use client'
import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/constants/Form/Button";
import { useState, useEffect } from "react";
import Modal from "@/constants/Modal/ViewModal";
import Profile from "@/components/User/profile";
const Sidebar = () => {
  const [userData, setUserData] = useState<{ type?: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openModal = (type: string) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const togglePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.listsidebar}>
        <li className={styles.sidebarItem}>
          <Image src="/company.svg" alt="Company logo" width={'32'} height={'32'} />
          <Link href={"/vn/company"} style={{ textDecoration: 'none' }} className={styles.sidebarText}>Company</Link>
        </li>
        <li className={styles.sidebarItem}>
          <Image src="/room.svg" alt="Room logo" width={'32'} height={'32'} />
          <a href="/home" className={styles.sidebarText}>Room</a>
        </li>
        <li className={styles.sidebarItem}>
          <Image src="/booking.svg" alt="Booking logo" width={'32'} height={'32'} />
          <a href="/users" className={styles.sidebarText}>Booking</a>
        </li>
        <li className={styles.sidebarItem}>
          <Image src="/user.svg" alt="User logo" width={'32'} height={'32'} />
          <Link href={"/vn/users"} style={{ textDecoration: 'none' }} className={styles.sidebarText}>Users</Link>
        </li>
      </ul>
      <div>
        <div className={styles.sidebarItem2}>
          <Image src="/book.png" alt="Book logo" width={'32'} height={'32'} />
          <a className={styles.sidebarText} onClick={() => togglePopup()}>Username</a>
        </div>
        {isProfileOpen && <Profile togglePopup={() => togglePopup()} />}
      </div>
    </aside>
  );
};

export default Sidebar;