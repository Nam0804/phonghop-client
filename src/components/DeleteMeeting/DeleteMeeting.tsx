import React, {useState} from 'react';
import {Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/DeleteMeeting.module.css';
import api from '@/axiosService';

const DeleteMeeting = ({room_id}: any) => {
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setErrorMessage('');
        setVisible(false);
    };

    const confirmDeleteAction = async (availabilities: any) => {
        if (availabilities == 0) {
            setErrorMessage('This room is under booking, cannot be deleted!');
        } else {
            try {
                const bearerToken = '5|LZTjWFa2QqubYjM1JSJZ1F7GFnqTdKxxbabeAJHH54f2abb6';
                const response = await api.delete(`delete-meeting-room/${room_id}`, {
                    headers: {Authorization: `Bearer ${bearerToken}`},
                });
                console.log('Delete response:', response);
            } catch (error) {
                console.error('Delete error:', error);
            } finally {
                setVisible(false);
            }
        }
    };
    return (
        <>
            <button onClick={showPopup}>Delete Meeting</button>
            <Modal
                title={
                    <div className={styles.warningTitle}>
                        Are you sure to delete this room?
                    </div>
                }
                open={visible}
                footer={null}
                closable={false}
                width={626}
            >
                {errorMessage && (
                    <div className={styles.errorMessage}>
                        {errorMessage}
                    </div>
                )}
                <div className={styles.buttonContainer}>
                    <div>
                        <Button className={styles.buttonDelete} onClick={() => confirmDeleteAction(1)}
                                label='DELETE'/>
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
