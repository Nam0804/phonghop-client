'use client'
import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/constants/Form/Button";
import { useState, useEffect } from "react";
import Modal from "@/constants/Modal/ViewModal";
import Profile from "@/components/User/profile";
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/lib/hooks';
import { setLoading } from '@/lib/features/loadingSlice';

const Sidebar = () => {
  const user = useSelector((state: any) => state.user.value);
  const usertype = user.type;
  const dispatch = useAppDispatch();

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
        {usertype === 0 && (
          <>
            <Link href={"/vn/company"} className={styles.customlink}>
              <li className={styles.sidebarItem}>
                <Image src="/company.svg" alt="Company logo" width={'32'} height={'32'} />
                <span className={styles.sidebarText}>Company</span>
              </li>
            </Link>
          </>
        )}
        {usertype === 1 && (
          <>
            <Link href={"/vn/room"} className={styles.customlink}>
              <li className={styles.sidebarItem}>
                <Image src="/room.svg" alt="Room logo" width={'32'} height={'32'} />
                <span className={styles.sidebarText}>Room</span>
              </li>
            </Link>
            <Link href={"/vn/booking"} className={styles.customlink}>
              <li className={styles.sidebarItem}>
                <Image src="/booking.svg" alt="Booking logo" width={'32'} height={'32'} />
                <span className={styles.sidebarText}>Booking</span>
              </li>
            </Link>
            <Link href={"/vn/users"} className={styles.customlink}>
              <li className={styles.sidebarItem}>
                <Image src="/user.svg" alt="User logo" width={'32'} height={'32'} />
                <span className={styles.sidebarText}>Users</span>            
              </li>
            </Link>
          </>
        )}
        {usertype === 2 && (
          <>
            <Link href={"/vn/room"} className={styles.customlink}>
              <li className={styles.sidebarItem}>
                <Image src="/room.svg" alt="Room logo" width={'32'} height={'32'} />
                <span className={styles.sidebarText}>Room</span>                
              </li>
            </Link>
            <Link href={"/vn/booking"} className={styles.customlink}>
              <li className={styles.sidebarItem}>
                <Image src="/booking.svg" alt="Booking logo" width={'32'} height={'32'} />
                <span className={styles.sidebarText}>Users</span>  
              </li>
            </Link>
          </>
        )}
        {usertype === 3 && (
          <>
            <Link href={"/vn/room"} className={styles.customlink}>
              <li className={styles.sidebarItem}>
                <Image src="/room.svg" alt="Room logo" width={'32'} height={'32'} />
                <span className={styles.sidebarText}>Room</span>                
              </li>
            </Link>
          </>
        )}
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