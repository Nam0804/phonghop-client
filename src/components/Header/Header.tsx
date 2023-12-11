import React, { Fragment } from "react";
import Head from "next/head";
import styles from "./Header.module.css";
import Button from "../Form/Button";
import Image from "next/image";

const Header = () => {
    return (
    <>
        <div className={styles.header}>
            <div className={styles.logo}>
                <Image src="/logo.svg" alt="Logo" width={79} height={72} />
                <h2 className={styles.text} >Hello,Manager!</h2>
            </div>
            <div className={styles.btn}>
                <Button className={`${styles.lang} ${styles.customlang}`} label="English">
                    <Image src="/england.svg" alt="England" width={24} height={24}></Image>
                </Button>
                <Button className={`${styles.lang} ${styles.customlogout}`} label="Logout">

                </Button>
            </div>

        </div>
    </>
    );
};

export default Header;