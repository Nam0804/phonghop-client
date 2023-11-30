import React, { Fragment } from "react";
import Head from "next/head";
import styles from "./Header.module.css";
import Button from "../Form/Button";

const Header = () => {
    return (
    <>
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src="logo.svg" alt="Logo" />
                <h2 className={styles.text}>Hello,Manager!</h2>
            </div>
            <div className={styles.btn}>
                <Button className={`${styles.lang} ${styles.customlang}`} label="English">
                    <img src="england.svg"></img>
                </Button>
                <Button className={`${styles.lang} ${styles.customlogout}`} label="Logout">

                </Button>
            </div>

        </div>
    </>
    );
};

export default Header;