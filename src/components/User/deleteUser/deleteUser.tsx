import React, { useState } from 'react';
import { Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/DeleteUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const DeleteUser = ({user_id}:any) => {
    const [visible, setVisible] = useState(false);

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const confirmDeleteAction = () => {
        const apiUrl = `http://127.0.0.1:8000/delete-users`;

        // Make a DELETE request to the API
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log('User deleted successfully.');
                } else {
                    console.error('Error deleting user:', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setVisible(false);
            });
    };

    return (
        <>
            <button onClick={showPopup}>Delete User</button>
            <Modal
                title={
                    <div className={styles.warningTitle}>
                        Are you sure to delete this staff?
                    </div>
                }
                visible={visible}
                footer={null}
                closable={false}
                width={626}
            >
                <div className={styles.buttonContainer}>
                    <div>
                        <Button className={styles.buttonDelete} onClick={() => confirmDeleteAction()} label='DELETE' />
                    </div>
                    <div>
                        <Button className={styles.buttonCancel} htmltype="submit" onClick={handleCancel} label='CANCEL'  />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DeleteUser;