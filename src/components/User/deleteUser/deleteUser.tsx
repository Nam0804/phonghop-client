import React, {useState} from 'react';
import {Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/DeleteUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '@/axiosService';

const DeleteUser = ({user_id}: any) => {
    console.log('user_id:', user_id);
    const [visible, setVisible] = useState(false);

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const confirmDeleteAction = async () => {
        try {
            const bearerToken = '5|LZTjWFa2QqubYjM1JSJZ1F7GFnqTdKxxbabeAJHH54f2abb6';
            const response = await api.delete(`delete-users/${user_id}`, {
                headers: { Authorization: `Bearer ${bearerToken}` },
            });
            console.log('Delete response:', response);
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setVisible(false);
        }
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
                open={visible}
                footer={null}
                closable={false}
                width={626}
            >
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

export default DeleteUser;