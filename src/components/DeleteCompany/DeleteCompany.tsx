import React, {useState} from 'react';
import {Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '@/css/DeleteMeeting.module.css';
import axios from "axios";
import './customantd.css'
import customstyle from '@/css/CompanyList.module.css'
import { toast } from 'react-hot-toast';

const DeleteMeeting = ({ room_id }:any) => {
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setErrorMessage('');
        setVisible(false);
    };

    const confirmDeleteAction = (availabilities: any) => {
        if (availabilities == 0) {
            setErrorMessage('This room is under booking, cannot be deleted!');
        } else {
            const apiUrl = process.env.API_URL + `delete-meeting-room/${room_id}`;
            const bearerToken = '2|SvAcZwcaNfXKQWK93eLcq8hht2WvVmO4eUL0dY5j995482db';
            axios.delete(apiUrl)
                .then(response => {
                    if (response.status === 204) {
                        console.log('Room deleted successfully.');
                    } else {
                        console.error('Error deleting room:', response.status);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setVisible(false);
                });
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
                            <Button className={styles.buttonDelete} onClick={() => confirmDeleteAction(1)} label='DELETE COMPANY'/>
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
export default DeleteMeeting;
