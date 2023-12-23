import React, {useState} from 'react';
import {Form, Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/DeleteMeeting.module.css';
import {fetch} from "undici-types";
import method from "async-validator/dist-types/validator/method";

const DeleteMeeting = () => {
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setErrorMessage('');
        setVisible(false);
    };

    const confirmDeleteAction = (availability: any) => {
        if (availability == 0) {
            setErrorMessage('This room is under booking, cannot be deleted!');
        } else {
            const BearerToken = '2|SvAcZwcaNfXKQWK93eLcq8hht2WvVmO4eUL0dY5j995482db';
            fetch('http://localhost:8080/api/delete-meeting-room', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authentications': 'Bearer ' + BearerToken
                },
            })
                .then(response => response.json())
                .catch(errorMessage => console.log(errorMessage));
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
                        <Button className={styles.buttonDelete} onClick={() => confirmDeleteAction(0)} label='DELETE'/>
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
