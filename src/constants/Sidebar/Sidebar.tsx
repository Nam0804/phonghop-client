import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.listsidebar}>
        <li className={styles.sidebarItem}>
          <Image src="/company.svg" alt="Company logo" width={'32'} height={'32'} />
          <Link href={"vn/company"} style={{textDecoration:'none'}} className={styles.sidebarText}>Company</Link>
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
            <a href="/products" className={styles.sidebarText}>Username</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;