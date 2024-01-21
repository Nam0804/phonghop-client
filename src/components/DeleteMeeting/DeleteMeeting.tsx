import React, {useState} from 'react';
import {Modal} from 'antd';
import Button from "@/constants/Form/Button";
import styles from '/src/css/DeleteMeeting.module.css';
import api from '@/axiosService';
import { toast } from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';
import customstyle from '@/css/CompanyList.module.css'

const DeleteMeeting = ({room_id, onDeleteSuccess}: any) => {
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const t = useTranslations('Delete');
    const locale = useLocale();
    const showPopup = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setErrorMessage('');
        setVisible(false);
    };

    const confirmDeleteAction = async () => {
        try {
            const response = await api.delete(`delete-meeting-room/${room_id}`);
            onDeleteSuccess();
            toast.success(t('success'));
        } catch (error) {
            console.log(error);
            toast.error(t('error'));
        } finally {
            setVisible(false);
        }
    };
    return (
        <>
            <button key="delete" className={customstyle.custombutton} style={{backgroundColor:'#E56353'}} onClick={showPopup}><img src="/delete.svg"></img></button>
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
                        <Button className={styles.buttonDelete} onClick={() => confirmDeleteAction()}
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