'use client'
import * as React from 'react';
import Button from '@/components/Form/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '@/components/Form/Input';
import styles from './Login.module.css';
import myImage from 'public/assets/images/Rectangle 1.png';
import Image from 'next/image';


export default function LoginPage() {
    const handleButtonClick = () => {
        alert("Tao là AN");
    };
    const cus: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        background: '#FFF',
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.05)',
        alignItems: 'center'
    };

    return (
        <>
            <div className={styles.container}>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <Image src={myImage} alt="My Image" className={styles.imageStyle} />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6' style={cus}>
                        <div>
                            <Input type="text" placeholder="Email" className={styles.inputsection} style={{ marginBottom: '24px' }}></Input>
                            <Input type="text" placeholder="Password" className={styles.inputsection} style={{ marginBottom: '48px' }}></Input>
                            <Button label="Login" onClick={handleButtonClick} className={styles.loginbtn}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
