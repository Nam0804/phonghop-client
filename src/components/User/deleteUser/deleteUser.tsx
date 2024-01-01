import React, { useState } from 'react';
import { Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/DeleteUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import api from '@/axiosService';
const DeleteUser = ({user_id}:any) => {
    const [visible, setVisible] = useState(false);

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const confirmDeleteAction = () => {
        const bearerToken = '2|SvAcZwcaNfXKQWK93eLcq8hht2WvVmO4eUL0dY5j995482db';
        api.delete(`delete-users/${user_id}`,bearerToken);
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