import React, { useState } from 'react';
import { Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/DeleteUser.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const DeleteUser = () => {
    const [visible, setVisible] = useState(false);

    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const confirmDeleteAction = (user_id:any) => {
        console.log('Success:', user_id);
        setVisible(false);
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
                        <Button className={styles.buttonDelete} onClick={confirmDeleteAction} label='DELETE' />
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