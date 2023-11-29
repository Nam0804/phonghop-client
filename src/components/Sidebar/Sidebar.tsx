import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.listsidebar}>
        <li className={styles.sidebarItem}>
          <img src="room.svg"></img>
          <a href="/home" className={styles.sidebarText}>Room</a>
        </li>
        <li className={styles.sidebarItem}>
          <img src="booking.svg"></img>
          <a href="/users" className={styles.sidebarText}>Booking</a>
        </li>
        <li className={styles.sidebarItem}>
          <img src="user.svg"></img>
          <a href="/products" className={styles.sidebarText}>Users</a>
        </li>
      </ul>
      <div>
        <div className={styles.sidebarItem2}>
            <img src="book.png"></img>
            <a href="/products" className={styles.sidebarText}>Username</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;