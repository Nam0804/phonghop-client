import React, {useState} from 'react';
import {Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '@/css/DeleteMeeting.module.css';
import axios from "axios";
import './customantd.css'
import customstyle from '@/css/CompanyList.module.css'

const DeleteCompany = ({ company_id }:any) => {
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setErrorMessage('');
        setVisible(false);
    };

    const deleteRoom = async () => {
        try {
            const apiUrl = `http://localhost:8000/api/delete-company/${company_id}`;
            const bearerToken = '1|FrRHqIiDPPINlg9UM9zxzW15Vz8PwpRGuzd1TIMwbff51f52';
    
            const response = await axios.delete(apiUrl, {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': 'Bearer ' + bearerToken
                }
            });
    
            if (response.status === 200) {
                console.log('Company deleted successfully.');
            } else {
                console.error('Error deleting company:', response.status, response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setVisible(false);
        }
    };
    return (
        <>
            <button key="delete" className={customstyle.custombutton} style={{backgroundColor:'#E56353'}} onClick={showPopup}><img src="/delete.svg" ></img></button>
                <Modal
                    title={
                        <div className={styles.warningTitle}>
                            Are you sure to delete this company?
                        </div>
                    }
                    open={visible}
                    footer={null}
                    closable={false}
                    width={626}
                    centered
                >
                    
                    {errorMessage && (
                        <div className={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                    <div className={styles.buttonContainer}>
                        <div>
                            <Button className={styles.buttonDelete} onClick={deleteRoom} label='DELETE COMPANY'/>
                        </div>
                        <div>
                            <Button className={styles.buttonCancel} htmltype="submit" onClick={handleCancel}
                                    label='CANCEL'/>
                        </div>
                    </div>
                </Modal>
        </>
    );
};
export default DeleteCompany;
