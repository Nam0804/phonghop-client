import React, {useState} from 'react';
import {Form, Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/DeleteMeeting.module.css';
import axios from "axios";

const DeleteMeeting = ({ room_id, availabilities }:any) => {
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setErrorMessage('');
        setVisible(false);
    };

    const confirmDeleteAction = () => {
        if (availabilities == 0) {
            setErrorMessage('This room is under booking, cannot be deleted!');
        } else {
            const apiUrl = 'http://127.0.0.1:8000/api/delete-meeting-room';
            const bearerToken = '2|SvAcZwcaNfXKQWK93eLcq8hht2WvVmO4eUL0dY5j995482db';
            axios.delete(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + bearerToken
                },
                data: room_id
            })
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
            <button onClick={showPopup}>Delete User</button>
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
                        <Button className={styles.buttonDelete} onClick={() => confirmDeleteAction()} label='DELETE'/>
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
