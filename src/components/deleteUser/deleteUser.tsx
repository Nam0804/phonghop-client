import React, { useState } from 'react';
import { Modal} from 'antd';
import Button from '../Form/Button';
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
                title="Are you sure to delte this staff"
                visible={visible}
            >
            <Button onClick={handleCancel} label='Cancel' />
            <Button onClick={confirmDeleteAction} label='Delete' />
            </Modal>
        </>
    );
};

export default DeleteUser;